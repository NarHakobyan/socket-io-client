import { IEvent } from '@interfaces/event';
import { Action } from '@ngrx/store';

namespace Action {

  export const ADD = '[EmitHistory] ADD';
  export const REMOVE = '[EmitHistory] REMOVE';
  export const REMOVE_ALL = '[EmitHistory] REMOVE_ALL';
  export const EDIT_PAYLOAD = '[EmitHistory] EDIT_PAYLOAD';

  export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: IEvent) {
    }
  }

  export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: { eventId: string }) {
    }
  }

  export class EditPayload implements Action {
    readonly type = EDIT_PAYLOAD;

    constructor(public payload: { eventId: string, data: any }) {
    }
  }

  export class RemoveAll implements Action {
    readonly type = REMOVE_ALL;
  }

  export type All = Add | Remove | RemoveAll | EditPayload;
}

export default Action;
