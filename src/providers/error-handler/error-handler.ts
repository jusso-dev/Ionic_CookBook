import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class ErrorHandlerProvider {

  constructor(private fb: AngularFireDatabase) {
    
  }

  LogError(user: string, error:any) {
    this.fb.list("/errors").push({
      "UserName": user,
      "Error": error,
      "DateTime": (new Date().toString())
    })
  }
}
