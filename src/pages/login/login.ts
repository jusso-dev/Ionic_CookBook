import { User } from '../../interfaces/user';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { Register } from '../register/register';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Auth]
})
export class Login implements OnInit, OnDestroy {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth,
    private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.user.isAuthenticated = this.afAuth.authState.subscribe((auth) => {
      if(auth) {
        this.navCtrl.setRoot(HomePage);
      }
    })
  }
  
  Register():void {
    this.navCtrl.push(Register)
  }

  Login():void {
    this.auth.Login();
  }

  ResetPassword(user: User):void {
    this.auth.ResetPassword(user);
  }

  ngOnDestroy() {
    this.user.isAuthenticated.unsubscribe();
  }
}
