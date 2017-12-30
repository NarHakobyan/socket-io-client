import { Action } from '@ngrx/store';
import { IEvent } from '../../interfaces/event';

namespace Action {

  export const ADD = '[EmitHistory] ADD';
  export const REMOVE = '[EmitHistory] REMOVE';
  export const SELECT_TAB = '[EmitHistory] SELECT_TAB';
  export const GET_ALL = '[EmitHistory] GET_ALL';
  export const REMOVE_ALL = '[EmitHistory] REMOVE_ALL';

  export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: IEvent) {
    }
  }

  export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: { tabId: string, eventId: string }) {
    }
  }

  export class GetAll implements Action {
    readonly type = GET_ALL;
  }

  export class SelectTab implements Action {
    readonly type = SELECT_TAB;

    constructor(public payload: { tabId: string }) {
    }
  }

  export class RemoveAll implements Action {
    readonly type = REMOVE_ALL;
  }

  export type All = Add | Remove | GetAll | RemoveAll | SelectTab;
}

export default Action;
