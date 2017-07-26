import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Profile } from '../pages/profile/profile';
import { Register } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';
import { config } from './firebase.config';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabase } from "angularfire2/database";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CameraUploadProvider } from '../providers/camera-upload/camera-upload';
import { Camera } from "@ionic-native/camera";
import { MetaDataProvider } from '../providers/meta-data/meta-data';
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    Login,
    Profile,
    Register,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    Profile,
    Login,
    Register,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CameraUploadProvider,
    Camera,
    MetaDataProvider,
    ErrorHandlerProvider
  ]
})
export class AppModule {}
