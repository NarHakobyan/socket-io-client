import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Store } from '@ngrx/store';

import { getTabHistory } from '@selectors/listen-history.selector';
import { getSelectedTabIndex } from '@selectors/listener-tabs.selector';
import { ListenHistoryActions } from '@actions';
import { AppState } from '@store';
import { Exportable } from '@interfaces/exportable';
import { IListenHistoryList } from '@interfaces/listen-history-list';
import { IListen } from '@interfaces/listen';

@Injectable()
export class ListenHistoryService implements Exportable {
  history: IListenHistoryList = {};

  constructor(public store: Store<AppState>) {
    (<any>window).getTabHistory = getTabHistory;

  }

  updateState(state: object): void {
    this.store.dispatch(new ListenHistoryActions.ChangeState(state));
  }

  add(event: IListen, tabIndex: number): Promise<IListen> {
    if (!tabIndex) {
      return this.addToSelectedTab(event);
    }
    const listenClone = cloneDeep(event);
    listenClone.tabIndex = tabIndex;
    this.store.dispatch(new ListenHistoryActions.Add(listenClone));
    return Promise.resolve(listenClone);
  }

  addToSelectedTab(event: IListen): Promise<IListen> {
    return this.store.select(getSelectedTabIndex).take(1).map(tabIndex => {
      const listenClone = cloneDeep(event);
      listenClone.tabIndex = tabIndex;
      this.store.dispatch(new ListenHistoryActions.Add(listenClone));
      return listenClone;
    }).toPromise();
  }

  getAll(tabIndex: number): Store<IListen[]> {
    return this.store.select(getTabHistory(tabIndex));
  }

  remove(listen: IListen, tabIndex: string) {
    this.store.dispatch(new ListenHistoryActions.Remove({listenId: listen.id}));
  }
}
