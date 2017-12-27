///<reference path="../../../node_modules/@ngrx/store/src/store.d.ts"/>
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as ProgressBarActions from '../actions/progress-bar.actions';

import { AppState } from '../reducers';
import { ProgressBarState } from '../reducers/progress-bar.reducer';

@Injectable()
export class ProgressBarService {

  progressBar: Store<ProgressBarState>;

  constructor(private store: Store<AppState>) {
    this.progressBar = this.store.select('progressBar');
  }

  get isVisible(): Observable<boolean> {
    return this.progressBar.select('show');
  }

  show() {
    this.store.dispatch(new ProgressBarActions.Show());
  }

  hide() {
    this.store.dispatch(new ProgressBarActions.Hide());
  }
}
