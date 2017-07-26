import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-error-handler',
  templateUrl: 'error-handler.html',
})
export class ErrorHandlerPage {

  constructor(private fb: AngularFireDatabase) {
  }

  handleErr(user: string, error:any) {
    this.fb.list("/errors").push({
      "UserName": user,
      "Error": error,
      "DateTime": (new Date().toString())
    })
  }

  PushToNewsfeed() {
  }
}
