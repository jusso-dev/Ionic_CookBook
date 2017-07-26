import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ErrorHandlerPage } from './error-handler';

@NgModule({
  declarations: [
    ErrorHandlerPage,
  ],
  imports: [
    IonicPageModule.forChild(ErrorHandlerPage),
  ],
  exports: [
    ErrorHandlerPage
  ]
})
export class ErrorHandlerPageModule {}
