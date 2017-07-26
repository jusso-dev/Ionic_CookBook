import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppVersion } from '@ionic-native/app-version';

@Injectable()
export class MetaDataProvider {

  constructor(private appver: AppVersion) {
  }

  returnAppVersion():any {
    this.appver.getVersionNumber().then((ver) => {
        return ver;   
    }).catch((err) =>{
      console.error(err);
    })
  }

}
