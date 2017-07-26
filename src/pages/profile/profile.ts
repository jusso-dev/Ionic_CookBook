import { Posts } from '../../interfaces/posts';
import { User } from '../../interfaces/user';
import { Login } from '../login/login';

import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular'
import { ErrorHandlerProvider } from "../../providers/error-handler/error-handler";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [ErrorHandlerProvider]
})
export class Profile implements OnInit, OnDestroy{

  user = {} as User;
  posts = {} as Posts;
  likes = this.posts.likes = 0;
  captureImg: any;

  items: FirebaseListObservable<any>;
  comments: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth,
  private fb: AngularFireDatabase, private alertCtrl: AlertController, private zone: NgZone,
  private log: ErrorHandlerProvider) {
  }

  ngOnInit() {
    this.user.isAuthenticated = this.afAuth.authState.subscribe((auth) => {
      if(!auth) {
        this.navCtrl.setRoot(Login)
      }
      else {
        this.user.firstName = this.afAuth.auth.currentUser.displayName;
        this.user.photoUrl = this.afAuth.auth.currentUser.photoURL;
      }
    })

// Only let the user of the profile see their own status'

    this.items = this.fb.list("/posts", {
      query: {
        orderByChild: "CreatedBy",
        equalTo: this.user.firstName
      }
    })
  }

  /*
  LikeStatus(key) {
    this.fb.list("/posts", {
      query: {
        orderByChild: "$key",
        equalTo: key
      }
    }).push({
      "Likes": this.posts.likes++
    })
  }
*/

  Logout() {
    this.afAuth.auth.signOut()
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
          this.fb.list("/posts/${postKey}/Comments").remove(key);
        }
      }
    ]
  });
  alert.present();
  }

  LikeStatus(key) {
    this.fb.database.ref().child(`/posts/${key}`)
    .update({
      "Likes": this.likes + 1
    }).catch((err) => {
      this.log.LogError(this.user.firstName, err)
    })
  }

  ShowComments(key, user) {
    this.comments = this.fb.list(`/posts/${key}/Comments`)
  }

  AddComment(key, user) {

  this.comments = this.fb.list(`/posts/${key}/Comments`)

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
          this.fb.list(`/posts/${key}/Comments`)
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

  postStatus(posts: Posts):void {
    const list = this.fb.list("/posts");
    list.push({
      "CreatedBy": this.user.firstName,
      "CreatedOn": (new Date()).toString(),
      "Post": this.posts.post
    }).catch((err) => {
      this.log.LogError(this.user.firstName, err)
    })
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
          this.fb.list("/posts").remove(key).catch((err) => {
            this.log.LogError(this.user.firstName, err)
          })
        }
      }
    ]
  });
  alert.present();
  }

  ngOnDestroy() {
    this.user.isAuthenticated.unsubscribe();
  }
}
