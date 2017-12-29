import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ProgressBarActions } from 'app/actions';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProgressBarEffect {

  @Effect() toggle: Observable<ProgressBarActions.All> = this.actions$
    .ofType<ProgressBarActions.All>(ProgressBarActions.SHOW, ProgressBarActions.HIDE).distinctUntilChanged()
    .do<ProgressBarActions.All>(action => {
      console.log(action);
    });
  @Effect() show: Observable<ProgressBarActions.Show> = this.actions$
    .ofType<ProgressBarActions.Show>(ProgressBarActions.SHOW).distinctUntilChanged()
    .do<ProgressBarActions.Show>(action => {
      console.log(action);
    });
  @Effect() hide: Observable<ProgressBarActions.Hide> = this.actions$
    .ofType<ProgressBarActions.Hide>(ProgressBarActions.HIDE).distinctUntilChanged()
    .do<ProgressBarActions.Hide>(action => {
      console.log(action);
    });

  constructor(private actions$: Actions) {
  }
}
