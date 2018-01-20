import { Action } from '@ngrx/store';
import { IListen } from '@interfaces/listen';

namespace Action {

  export const ADD = '[ListenHistory] ADD';
  export const REMOVE = '[ListenHistory] REMOVE';
  export const REMOVE_ALL = '[ListenHistory] REMOVE_ALL';
  export const CHANGE_STATE = '[ListenHistory] CHANGE_STATE';

  export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: IListen) {
    }
  }

  export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: { listenId: string }) {
    }
  }

  export class RemoveAll implements Action {
    readonly type = REMOVE_ALL;
  }

  export class ChangeState implements Action {
    readonly type = CHANGE_STATE;

    constructor(public payload: object) {
    }
  }

  export type All = Add | Remove | RemoveAll | ChangeState;
}

export default Action;
