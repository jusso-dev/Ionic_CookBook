import { User } from '../../interfaces/user';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [Auth]
})
export class Register implements OnInit, OnDestroy {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth,
  private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.user.isAuthenticated = this.afAuth.authState.subscribe((auth) =>{
      if(auth) {
        this.navCtrl.setRoot(HomePage)
      }
    })
  }

  Register(user: User) {
    this.auth.Register(user);
  }

  ngOnDestroy() {
    this.user.isAuthenticated.unsubscribe();
  }
}
