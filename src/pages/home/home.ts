import { Posts } from '../../interfaces/posts';
import { User } from '../../interfaces/user';
import { Login } from '../login/login';

import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NavController, AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import { CameraUploadProvider } from "../../providers/camera-upload/camera-upload";
import * as firebase from 'firebase';
import { ErrorHandlerProvider } from "../../providers/error-handler/error-handler";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ErrorHandlerProvider]
})
export class HomePage implements OnInit, OnDestroy {

  user = {} as User;
  posts = {} as Posts;
  likes = this.posts.likes = 0;
  postKey: any;
  cameraImg: any;

  items: FirebaseListObservable<any>;
  comments: FirebaseListObservable<any>;
  photos: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, 
  private firebase: AngularFireDatabase, private alertCtrl: AlertController, private captureImg: CameraUploadProvider,
  private zone: NgZone, private log: ErrorHandlerProvider) {

  }

  ngOnInit() {
    this.user.isAuthenticated = this.afAuth.authState.subscribe((auth) => {
      if(!auth) {
        this.navCtrl.setRoot(Login)
      }
      else {
        this.user.firstName = auth.displayName;
        this.user.photoUrl = auth.photoURL;
      }
    })
    this.items = this.firebase.list("/posts");
  }

// Only show delete button to user if they actually created the status
// We return false if they match because we are binding to the [hidden] directive

  checkUserStatus(createdBy:string):boolean {

    if(this.user.firstName === createdBy) {
      return false;
    }
    else {
      return true;
    }
  }

  UploadImage(key) {
    this.zone.run(() => {
    this.captureImg.CaptureImage(key);
    })
  }

  // TODO: figure out how to get this to work
  
  DeleteComment(postKey, key) {
    let alert = this.alertCtrl.create({
    title: 'Are you sure?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        }
      },
      {
        text: 'Delete',
        handler: () => {
          this.firebase.list("/posts/${postKey}/Comments").remove(key);
        }
      }
    ]
  });
  alert.present();
  }

  LikeStatus(key) {
    this.firebase.database.ref().child(`/posts/${key}`)
    .update({
      "Likes": this.likes + 1
    }).catch((err) => {
      this.log.LogError(this.user.firstName, err)
    })
  }

  ShowComments(key, user) {
    this.comments = this.firebase.list(`/posts/${key}/Comments`)
  }

  AddComment(key, user) {

  this.comments = this.firebase.list(`/posts/${key}/Comments`)

  let alert = this.alertCtrl.create({
    title: 'Comment',
    inputs: [
      {
        name: 'Comment',
        placeholder: 'Comment'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
        }
      },
      {
        handler: data => {
          this.firebase.list(`/posts/${key}/Comments`)
          .push({
            "PostId": key,
            "Comment": data,
            "CreatedBy": user,
            "CommentCreated": (new Date()).toString()
          })
        }
      } 
    ]
  });

  alert.present();
  }

  removeStatus(key) {
  let alert = this.alertCtrl.create({
    title: 'Are you sure?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        }
      },
      {
        text: 'Delete',
        handler: () => {
          this.firebase.list("/posts").remove(key).catch((err) => {
            this.log.LogError(this.user.firstName, err)
          })
        }
      }
    ]
  });
  alert.present();
  }

  postStatus(posts: Posts):void {
    const list = this.firebase.list("/posts");
    list.push({
      "CreatedBy": this.user.firstName,
      "CreatedOn": (new Date()).toString(),
      "Post": this.posts.post
    }).catch((err) => {
      this.log.LogError(this.user.firstName, err)
    })
  }

  ngOnDestroy() {
    this.user.isAuthenticated.unsubscribe();
  }

}
