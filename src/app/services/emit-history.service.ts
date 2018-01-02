import { Injectable } from '@angular/core';
import { has, cloneDeep } from 'lodash';

import { IEmitHistory } from '@interfaces/emit-history';
import { IEmitHistoryList } from '@interfaces/emit-history-list';
import { getSelectedTabIndex } from '@selectors/tabs.selector';
import { EmitHistoryActions } from '@actions';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { IEvent } from '@interfaces/event';

@Injectable()
export class EmitHistoryService {

  history: IEmitHistoryList = {};

  constructor(public store: Store<AppState>) {
  }

  add(event: IEvent): Promise<IEvent> {
    return this.store.select(getSelectedTabIndex).take(1).map(number => {
      const eventClone = cloneDeep(event);
      eventClone.tabIndex = number;
      this.store.dispatch(new EmitHistoryActions.Add(eventClone));
      return eventClone;
    }).toPromise();

  }

  getAll(tabId: string) {
    if (!has(this.history, tabId)) {
      this.history[tabId] = new Set<IEmitHistory>();
    }
    return this.history[tabId];
  }

  remove(event: IEmitHistory, tabId: string) {
    this.history[tabId].delete(event);
  }

}
