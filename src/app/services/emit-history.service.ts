import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Store } from '@ngrx/store';

import { IEmitHistoryList } from '@interfaces/emit-history-list';
import { getTabEvents } from '@selectors/emit-history.selector';
import { getSelectedTabIndex } from '@selectors/emitter-tabs.selector';
import { EmitHistoryActions } from '@actions';
import { IEvent } from '@interfaces/event';
import { AppState } from '@store';
import { Exportable } from '@interfaces/exportable';

@Injectable()
export class EmitHistoryService implements Exportable {
  history: IEmitHistoryList = {};

  constructor(public store: Store<AppState>) {
  }

  updateState(state: object): void {
    this.store.dispatch(new EmitHistoryActions.ChangeState(state));
  }

  add(event: IEvent, tabIndex: number): Promise<IEvent> {
    if (!tabIndex) {
      return this.addToSelectedTab(event);
    }
    const eventClone = cloneDeep(event);
    eventClone.tabIndex = tabIndex;
    this.store.dispatch(new EmitHistoryActions.Add(eventClone));
    return Promise.resolve(eventClone);
  }

  addToSelectedTab(event: IEvent): Promise<IEvent> {
    return this.store.select(getSelectedTabIndex).take(1).map(tabIndex => {
      const eventClone = cloneDeep(event);
      eventClone.tabIndex = tabIndex;
      this.store.dispatch(new EmitHistoryActions.Add(eventClone));
      return eventClone;
    }).toPromise();
  }

  getAll(tabIndex: number): Store<IEvent[]> {
    console.log('tabIndex', tabIndex);
    return this.store.select(getTabEvents(tabIndex));
  }

  remove(event: IEvent, tabIndex: string) {
    this.store.dispatch(new EmitHistoryActions.Remove({eventId: event.id}));
  }

  editPayload(eventId: string, data: any) {
    this.store.dispatch(new EmitHistoryActions.EditPayload({eventId: eventId, data}));
  }
}
