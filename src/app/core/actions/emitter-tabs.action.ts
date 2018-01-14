import { Action } from '@ngrx/store';
import { ITab } from '@interfaces/tab';

namespace Action {

  export const ADD = '[Tabs] ADD';
  export const REMOVE = '[Tabs] REMOVE';
  export const SELECT_TAB = '[Tabs] SELECT_TAB';
  export const REMOVE_ALL = '[Tabs] REMOVE_ALL';
  export const CHANGE_EMIT_NAME = '[Tabs] CHANGE_EMIT_NAME';
  export const CHANGE_EMIT_BODY = '[Tabs] CHANGE_EMIT_BODY';

  export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: ITab) {
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


  export class ChangeEmitName implements Action {
    readonly type = CHANGE_EMIT_NAME;

    constructor(public payload: { name: string, tabIndex: number }) {
    }
  }

  export class ChangeEmitBody implements Action {
    readonly type = CHANGE_EMIT_BODY;

    constructor(public payload: { body: object, tabIndex: number }) {
    }
  }

  export type All = Add | Remove | RemoveAll | SelectTab | ChangeEmitName | ChangeEmitBody;
}

export default Action;
