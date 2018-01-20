import { Action } from '@ngrx/store';
import { ITab } from '@interfaces/tab';

namespace Action {

  export const ADD = '[EmitterTabs] ADD';
  export const REMOVE = '[EmitterTabs] REMOVE';
  export const SELECT_TAB = '[EmitterTabs] SELECT_TAB';
  export const REMOVE_ALL = '[EmitterTabs] REMOVE_ALL';
  export const CHANGE_EMIT_NAME = '[EmitterTabs] CHANGE_EMIT_NAME';
  export const CHANGE_EMIT_BODY = '[EmitterTabs] CHANGE_EMIT_BODY';
  export const CHANGE_STATE = '[EmitterTabs] CHANGE_STATE';

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

  export class ChangeState implements Action {
    readonly type = CHANGE_STATE;

    constructor(public payload: object) {
    }
  }

  export type All = Add | Remove | RemoveAll | SelectTab | ChangeEmitName | ChangeEmitBody | ChangeState;
}

export default Action;
