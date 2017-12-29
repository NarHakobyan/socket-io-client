import { Inject, Injectable } from '@angular/core';
import { SocketIO } from '@modules/socket/socket.token';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { SocketIoActions } from 'app/actions';

@Injectable()
export class SocketIoEffect {

  @Effect() connect$ = this.actions$
    .ofType<SocketIoActions.Connect>(SocketIoActions.CONNECT).distinctUntilChanged()
    // .map(action => action.payload)
    .map(action => {
      const socket = this.io.connect(action.payload);

      socket.on('connect', () => {
        this.store.dispatch(new SocketIoActions.Connected(socket));
      });
      return action;
    });
  @Effect() disconnect$ = this.actions$
    .ofType<SocketIoActions.Disconnect>(SocketIoActions.DISCONNECT).distinctUntilChanged()
    .map(action => {
      const socket = this.store.select('socketIo', 'socket');
      console.log(socket);
    });

  constructor(private actions$: Actions, @Inject(SocketIO) public io: SocketIOClientStatic, public store: Store<AppState>) {
    console.log('SocketIoService is running');

    // console.log('io', io);
  }

  // .switchMap(() => {});

}
