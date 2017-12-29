import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProgressBarReducer } from '@reducers';

import { AppState } from '@store';
import { Observable } from 'rxjs/Observable';
import { ProgressBarActions } from '../actions';

@Injectable()
export class ProgressBarService {

  progressBar: Store<ProgressBarReducer.ProgressBarState>;

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
