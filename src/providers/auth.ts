import { User } from '../interfaces/user';
import { HomePage } from '../pages/home/home';

import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FirebaseApp } from 'angularfire2/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { Subscribable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase/app';

@Injectable()
export class Auth {

  private _user = {} as User;

  constructor(private afAuth: AngularFireAuth, private fireDatabase: AngularFireDatabase, private navCtrl: NavController, 
    private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  loadingMsg() {
    // TODO - fix this to load dynamically

    let loading = this.loadingCtrl.create({
      content: "Loading..",
      duration: 2000
    })
    return loading;
  }

  alertMsg(err: string) {
    let alertMsg = this.alertCtrl.create({
      title: "Opps, that didn't work..",
      subTitle: err,
      buttons: ["OK"]
    })
    return alertMsg;
  }

  async Register(user: User) {
    try {
      this.loadingMsg().present();
      await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((fbUser: firebase.User) => {
        if(fbUser) {
        this.fireDatabase.object(`usersinfo/${fbUser.uid}`).set({
        "Email": user.email,
        "FirstName": user.firstName,
        "LastName": user.lastName
          });
        }
      })
    }
    catch(err) {
      this.alertMsg(err.message).present();
    }
  }

  async Login() {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();

      this.afAuth.auth.signInWithRedirect(provider).then(() => {
        this.afAuth.auth.getRedirectResult().then((result) => {
        })
      })
    }
    catch(err) {
      this.alertMsg(err).present();
    }
  }

  async Signout() {
    await this.afAuth.auth.signOut();
  }

  async ResetPassword(user: User) {
    try {
      this.loadingMsg().present();
      this.afAuth.auth.sendPasswordResetEmail(user.email);
    }
    catch(err) {
      this.alertMsg(err.message).present();
    }
  }
}
