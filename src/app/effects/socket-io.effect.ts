import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as SocketIoActions from '../actions/socket-io.actions';


@Injectable()
export class SocketIoEffect {

  @Effect() connect$ = this.actions$
    .ofType<SocketIoActions.Connect>(SocketIoActions.CONNECT).distinctUntilChanged()
    // .map(action => action.payload)
    .do(action => {
      console.log('action========================', action);
    });

  // .switchMap(() => {});

  constructor(private actions$: Actions) {
  }
}
