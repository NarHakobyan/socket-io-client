import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as io from 'socket.io-client';
import { SocketIoService } from './socket.service';
import { SocketIO } from './socket.token';

(<any>window).io = io;

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [{
    provide: SocketIO, useValue: io
  }, SocketIoService],
  declarations: [],
  exports: []
})
export class SocketModule { }
