import { Action } from '@ngrx/store';

namespace Action {

  export const ADD = '[Tabs] ADD';
  export const REMOVE = '[Tabs] REMOVE';
  export const SELECT_TAB = '[Tabs] SELECT_TAB';
  export const REMOVE_ALL = '[Tabs] REMOVE_ALL';

  export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: { name: string }) {
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

  export type All = Add | Remove | RemoveAll | SelectTab;
}

export default Action;
