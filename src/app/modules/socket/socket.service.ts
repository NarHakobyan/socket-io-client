import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { isEmpty } from 'lodash';
import { Store } from '@ngrx/store';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SocketEvent } from '@interfaces/socket-event';
import { ProgressBarActions } from '@actions';
import { SocketIO } from './socket.token';
import { AppState } from '@store';


@Injectable()
export class SocketIoService implements OnDestroy {
  public socket: SocketIOClient.Socket;

  public connected = new Subject<boolean>();
  public connectedSocketEvent = new BehaviorSubject<boolean>(false);
  public disconnectedSocketEvent = new BehaviorSubject<boolean>(true);
  public connectEvent = new Subject<SocketEvent>();
  public connectingEvent = new Subject<SocketEvent>();
  public connectErrorEvent = new Subject<SocketEvent>();
  public connectTimeoutEvent = new Subject<SocketEvent>();
  public reconnectEvent = new Subject<SocketEvent>();
  public reconnectAttemptEvent = new Subject<SocketEvent>();
  public disconnectEvent = new Subject<SocketEvent>();
  public reconnectFailedEvent = new Subject<SocketEvent>();
  public reconnectErrorEvent = new Subject<SocketEvent>();
  public reconnectingEvent = new Subject<SocketEvent>();
  public pingEvent = new Subject<SocketEvent>();
  public pongEvent = new Subject<SocketEvent>();
  public errorEvent = new Subject<SocketEvent>();
  public allEvents = Observable.merge<SocketEvent>(
    this.connectEvent,
    this.connectingEvent,
    this.connectErrorEvent,
    this.connectTimeoutEvent,
    this.reconnectEvent,
    this.reconnectAttemptEvent,
    this.disconnectEvent,
    this.reconnectFailedEvent,
    this.reconnectErrorEvent,
    this.reconnectingEvent,
    this.pingEvent,
    this.pongEvent,
    this.errorEvent,
  );

  constructor(@Inject(SocketIO) public io: SocketIOClientStatic, public store: Store<AppState>) {
    (<any>window).io = io;
    (<any>window).service = this;

    const prot = (<any>io.Socket).prototype;

    const onconnect = prot.onconnect;
    const onclose = prot.onclose;
    prot.onconnect = () => {
      console.log('onconnect');
      onconnect.call(this.socket);
      this.changeStatus(true, false);
    };
    prot.onclose = () => {
      console.log('onclose');
      onclose.call(this.socket);
      this.changeStatus(false, true);

    };

  }

  connecting() {
    return this.disconnectedSocketEvent
      .map(disconnected => Boolean(!isEmpty(this.socket) && disconnected))
      .distinctUntilChanged();
  }

  connect(url: string) {
    this.socket = this.io.connect(url);
    (<any>window).socket = this.socket;
    this.changeStatus(false, true);
    this.listenOnConnect();
  }

  listenOnConnect() {
    if (this.socket) {
      this.socket.on('connect', (data) => {
        this.connected.next(true);
        this.connectEvent.next({
          status: 'connect',
          data
        });
      });
      this.socket.on('connecting', (data) => {
        this.connectingEvent.next({
          status: 'connecting',
          data
        });
      });
      this.socket.on('connect_error', (error) => {
        this.connectErrorEvent.next({
          status: 'connect_error',
          error
        });

      });
      this.socket.on('connect_timeout', (error) => {
        this.connectTimeoutEvent.next({
          status: 'connect_timeout',
          error
        });
      });

      this.socket.on('error', (error) => {
        this.errorEvent.next({
          status: 'error',
          error
        });
      });
      this.socket.on('reconnect', (data) => {
        this.reconnectEvent.next({
          status: 'reconnect',
          data
        });
      });
      this.socket.on('reconnect_attempt', (data) => {
        this.reconnectAttemptEvent.next({
          status: 'reconnect_attempt',
          data
        });
      });
      this.socket.on('reconnect_failed', (error) => {
        this.reconnectFailedEvent.next({
          status: 'reconnect_failed',
          error
        });
      });
      this.socket.on('reconnect_error', (error) => {
        this.reconnectErrorEvent.next({
          status: 'reconnect_error',
          error
        });
      });
      this.socket.on('reconnecting', (data) => {
        this.reconnectingEvent.next({
          status: 'reconnecting',
          data
        });
      });
      this.socket.on('ping', (data) => {
        this.pingEvent.next({
          status: 'ping',
          data
        });
      });
      this.socket.on('pong', (data) => {
        this.pongEvent.next({
          status: 'pong',
          data
        });
      });
      this.socket.on('disconnect', (data) => {
        this.connected.next(false);
        this.disconnectEvent.next({
          status: 'disconnect',
          data
        });
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket.removeAllListeners();
      this.socket = null;
      this.store.dispatch(new ProgressBarActions.Hide());

      this.changeStatus(false, true);
    }
  }

  emit(eventName: string, data: any): Promise<any> {
    if (this.socket) {
      return new Promise<any>((resolve) => {
        this.socket.emit(eventName, data, (args) => {
          resolve(args);
        });
      });
    }
  }

  on(eventName: string) {
    console.log(`on(${eventName}: string) `);
    return Observable.create(observer => {
      console.log('Observable.create');
      this.socket.on(eventName, (data) => {
        console.log('this.socket.on(eventName', data);
        observer.next(data);
      });
      return {
        dispose: this.socket.close
      };
    });

  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  private changeStatus(connect, disconnect) {
    this.connectedSocketEvent.next(connect);
    this.disconnectedSocketEvent.next(disconnect);
  }
}
