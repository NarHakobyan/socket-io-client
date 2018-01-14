import { getTabEmitName, getTabEmitBody } from '@selectors/emitter-tabs.selector';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store';

@Injectable()
export class EmitterService {

  constructor(public store: Store<AppState>) {
  }


  getEmitName(tabIndex: number): Store<string> {
    return this.store.select(getTabEmitName(tabIndex));
  }

  getEmitBody(tabIndex: number): Store<object> {
    return this.store.select(getTabEmitBody(tabIndex));
  }

}
