import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@store';
import { ProgressBarActions } from 'app/core/actions';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { SocketIO } from './socket.token';
import Socket = SocketIOClient.Socket;

@Injectable()
export class SocketIoService {

  private socket: Socket;
  public subscriptions: Subscription[] = [];
  public connectEvent = new Subject();
  public connectingEvent = new BehaviorSubject(null);
  public connectErrorEvent = new BehaviorSubject(null);
  public connectTimeoutEvent = new BehaviorSubject(null);
  public reconnectEvent = new Subject();
  public reconnectAttemptEvent = new Subject();
  public disconnectEvent = new Subject();
  public allEvents = Observable.merge(
    this.connectEvent,
    this.reconnectEvent,
    this.reconnectAttemptEvent,
    this.disconnectEvent
  );
  public reconnectFailedEvent = new BehaviorSubject(null);
  public reconnectErrorEvent = new BehaviorSubject(null);
  public reconnectingEvent = new BehaviorSubject(null);
  public pingEvent = new BehaviorSubject(null);
  public pongEvent = new BehaviorSubject(null);
  public errorEvent = new BehaviorSubject(null);

  constructor(@Inject(SocketIO) public io: SocketIOClientStatic, public store: Store<AppState>) {
    console.log('SocketIoService is running');

    this.allEvents.subscribe(data => {
      console.log('allEvents');
      if (this.connecting) {
        this.store.dispatch(new ProgressBarActions.Show());
      }
    });
  }

  get connected() {
    return _.get(this, 'socket.connected', false);
  }

  get connecting() {
    return Boolean(this.socket && !_.get(this, 'socket.connected', false));
  }

  connect(url: string): Observable<any> {
    if (_.isEmpty(this.socket)) {
      this.store.dispatch(new ProgressBarActions.Show());
      this.socket = this.io.connect(url);
      this.subscriptions[this.subscriptions.length] = this.connectEvent.subscribe(() => {
        this.store.dispatch(new ProgressBarActions.Hide());
      });
      this.subscriptions[this.subscriptions.length] = this.reconnectingEvent.subscribe(() => {
        this.store.dispatch(new ProgressBarActions.Show());
      });
      (<any>window).socket = this.socket;
      return this.listenOnConnect();
    } else {
      return Observable.empty();
    }
  }

  listenOnConnect() {
    this.reconnectAttemptEvent.subscribe(console.log);
    if (this.socket) {
      this.socket.on('connect', (data) => {
        console.log('connect');
        this.connectEvent.next(data);
      });
      this.socket.on('connecting', (data) => {
        this.connectingEvent.next(data);
      });
      this.socket.on('connect_error', (error) => {
        this.connectErrorEvent.next(error);

      });
      this.socket.on('connect_timeout', (error) => {
        this.connectTimeoutEvent.next(error);
      });

      this.socket.on('error', (error) => {
        this.errorEvent.next(error);
      });
      this.socket.on('reconnect', (data) => {
        this.reconnectEvent.next(data);
      });
      this.socket.on('reconnect_attempt', (data) => {
        this.reconnectAttemptEvent.next(data);
      });
      this.socket.on('reconnect_failed', (error) => {
        this.reconnectFailedEvent.next(error);
      });
      this.socket.on('reconnect_error', (error) => {
        this.reconnectErrorEvent.next(error);
      });
      this.socket.on('reconnecting', (data) => {
        this.reconnectingEvent.next(data);
      });
      this.socket.on('ping', (data) => {
        this.pingEvent.next(data);
      });
      this.socket.on('pong', (data) => {
        this.pongEvent.next(data);
      });
      this.socket.on('disconnect', (data) => {
        this.disconnectEvent.next(data);
      });
    }

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
        this.socket.emit(eventName, data, (...args) => {
          resolve(args);
        });
      });
    }
  }

  disconnect() {
    if (this.socket) {
      if (!_.isEmpty(this.subscriptions)) {
        for (const subscription of this.subscriptions) {
          subscription.unsubscribe();
        }
        this.subscriptions = [];
      }
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.store.dispatch(new ProgressBarActions.Hide());
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
