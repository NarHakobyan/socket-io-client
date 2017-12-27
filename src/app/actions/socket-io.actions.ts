import { Action } from '@ngrx/store';

export const CONNECT = '[ProgressBar] CONNECT';
export const CONNECTED = '[ProgressBar] CONNECTED';
export const DISCONNECT = '[ProgressBar] DISCONNECT';

export class Connect implements Action {
  readonly type = CONNECT;

  constructor(public payload: string) {
  }
}

export class Connected implements Action {
  readonly type = CONNECTED;

  constructor(public payload: SocketIOClient.Socket) {
  }

}

export class Disconnect implements Action {
  readonly type = DISCONNECT;
}

export type All = Connect | Connected | Disconnect;
