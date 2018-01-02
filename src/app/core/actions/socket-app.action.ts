import { Action } from '@ngrx/store';

namespace Action {

  export const SET_CONNECT_URL = '[SocketApp] SET_CONNECT_URL';
  export const REMOVE_CONNECT_URL = '[SocketApp] REMOVE_CONNECT_URL';

  export class SetConnectUrl implements Action {
    readonly type = SET_CONNECT_URL;

    constructor(public payload: { connectUrl: string }) {
    }
  }

  export class RemoveConnectUrl implements Action {
    readonly type = REMOVE_CONNECT_URL;
  }

  export type All = SetConnectUrl | RemoveConnectUrl;
}

export default Action;
