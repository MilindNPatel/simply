import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './message/message.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AgmCoreModule } from '@agm/core';
import { WebserviceHandlerService } from './services/webservice-handler.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBVtvWE1MACKfSVPLmU7HuTo8mgfjSh-uo',
      // libraries: ['places']
    }),

  ],
  exports: [
    AgmCoreModule
  ],
  providers: [
    MessageService,
    WebserviceHandlerService
  ]
})
export class SharedModule { }
