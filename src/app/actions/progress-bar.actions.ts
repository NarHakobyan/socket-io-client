import { Action } from '@ngrx/store';

export const SHOW = '[ProgressBar] SHOW';
export const HIDE = '[ProgressBar] HIDE';

export class Show implements Action {
  readonly type = SHOW;
}

export class Hide implements Action {
  readonly type = HIDE;
}

export type All = Show | Hide;
