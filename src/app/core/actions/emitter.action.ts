import { Action } from '@ngrx/store';

namespace Action {

  export const CHANGE_EMIT_NAME = '[Emitter] CHANGE_EMIT_NAME';
  export const CHANGE_EMIT_BODY = '[Emitter] CHANGE_EMIT_BODY';

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

  export type All = ChangeEmitName | ChangeEmitBody;
}

export default Action;
