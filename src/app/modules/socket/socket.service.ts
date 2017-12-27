import { Inject, Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { SocketIO } from './socket.token';
import Socket = SocketIOClient.Socket;

@Injectable()
export class SocketIoService {

  private socket: Socket;

  constructor(@Inject(SocketIO) public io: SocketIOClientStatic) {
    console.log('SocketIoService is running');

    // console.log('io', io);
  }

  get connected() {
    return _.get(this, 'socket.connected', false);
  }

  connect(url: string) {
    if (_.isEmpty(this.socket)) {
      this.socket = this.io.connect(url);
      (<any>window).socket = this.socket;
      return this.onConnect();
    } else if (this.socket.connected) {
      return Observable.of({
        status: 'success',
        data: null
      });
    }
    return Observable.throw({
      status: 'connect_error',
      data: null
    });
  }

  onConnect() {
    if (this.socket) {
      return Observable.create(observer => {
        this.socket.on('connect', (data) => {
          console.log('connect');
          observer.next({
            status: 'connect',
            data
          });
        });
        this.socket.on('connecting', (data) => {
          observer.next({
            status: 'connecting',
            data
          });
        });
        this.socket.on('connect_error', (error) => {
          observer.next({
            status: 'connect_error',
            error
          });
        });
        this.socket.on('connect_timeout', (error) => {
          observer.next({
            status: 'connect_timeout',
            error
          });
        });

        this.socket.on('error', (error) => {
          observer.next({
            status: 'error',
            error
          });
        });
        this.socket.on('reconnect', (data) => {
          observer.next({
            status: 'reconnect',
            data
          });
        });
        this.socket.on('reconnect_attempt', (data) => {
          observer.next({
            status: 'reconnect_attempt',
            data
          });
        });
        this.socket.on('reconnect_failed', (error) => {
          observer.next({
            status: 'reconnect_failed',
            error
          });
        });
        this.socket.on('reconnect_error', (error) => {
          observer.next({
            status: 'reconnect_error',
            error
          });
        });
        this.socket.on('reconnecting', (data) => {
          observer.next({
            status: 'reconnecting',
            data
          });
        });
        this.socket.on('ping', (data) => {
          observer.next({
            status: 'ping',
            data
          });
        });
        this.socket.on('pong', (data) => {
          observer.next({
            status: 'pong',
            data
          });
        });
        return {
          dispose: this.socket.close
        };
      });
    }
  }

  emit(eventName: string, data: any): Promise<any> {
    if (this.socket) {
      return new Promise<any>((resolve) => {
        this.socket.emit(eventName, data, function (result) {
          resolve(result);
        });
      });
    } else {
      return Promise.resolve('');
    }
  }

  disconnect() {
    // if (_.get(this, 'socket.connected') === true) {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log('disconnected');
    }
  }

  on(eventName: string) {
    return Observable.create(observer => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      });
      return {
        dispose: this.socket.close
      };
    });

  }
}
