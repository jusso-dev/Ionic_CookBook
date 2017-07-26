import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraUploadProvider {

  constructor(private camera: Camera) {
  }

  CaptureImage() {
    let captureDataUrl: string;
    let date = new Date().toString();

    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(cameraOptions).then((imageData) => {

      captureDataUrl = 'data:image/jpeg;base64,' + imageData;

      let storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${date}.jpg`);

      imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
     // Do something here when the data is succesfully uploaded!
      return snapshot.downloadURL;
    });
    }, (err) => {
      // Handle error
    });
  }

}
