import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { User } from '../../interfaces/user';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { Login } from '../login/login';
import { Profile } from '../profile/profile';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage  {

  user = {} as User;

  tab1Root = HomePage;
  tab2Root = Profile;

  constructor(private navCtrl: NavController, private afAuth: AngularFireAuth) {
  }
}
