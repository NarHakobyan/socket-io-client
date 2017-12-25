import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as io from 'socket.io-client';


import { AppComponent } from './app.component';
import { AppMaterialModule } from './material/material.module';
import { SocketIoService } from './socket-io.service';
import { SocketIO } from './socket.token';

(<any>window).io = io;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [{
    provide: SocketIO, useValue: io
  }, SocketIoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
