import { Action } from '@ngrx/store';
import { IListenerTab } from '@interfaces/listener-tab';

namespace Action {

  export const ADD = '[ListenerTabs] ADD';
  export const REMOVE = '[ListenerTabs] REMOVE';
  export const SELECT_TAB = '[ListenerTabs] SELECT_TAB';
  export const REMOVE_ALL = '[ListenerTabs] REMOVE_ALL';
  export const CHANGE_LISTEN_NAME = '[ListenerTabs] CHANGE_LISTEN_NAME';
  export const CHANGE_STATE = '[ListenerTabs] CHANGE_STATE';

  export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: IListenerTab) {
    }
  }

  export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: { index: number }) {
    }
  }

  export class SelectTab implements Action {
    readonly type = SELECT_TAB;

    constructor(public payload: { index: number }) {
    }
  }

  export class RemoveAll implements Action {
    readonly type = REMOVE_ALL;
  }


  export class ChangeListenName implements Action {
    readonly type = CHANGE_LISTEN_NAME;

    constructor(public payload: { name: string, tabIndex: number }) {
    }
  }

  export class ChangeState implements Action {
    readonly type = CHANGE_STATE;

    constructor(public payload: object) {
    }
  }

  export type All = Add | Remove | RemoveAll | SelectTab | ChangeListenName | ChangeState;
}

export default Action;
