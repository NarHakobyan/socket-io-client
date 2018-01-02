import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@store';


@Injectable()
export class EmitHistoryEffect {


  constructor(private actions$: Actions, private store: Store<AppState>) {
  }
}
