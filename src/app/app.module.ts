import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as io from 'socket.io-client';


import { AppComponent } from './app.component';
import { SocketIoService } from './socket-io.service';
import { SocketIO } from './socket.token';

(<any>window).io = io;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{
    provide: SocketIO, useValue: io
  }, SocketIoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
