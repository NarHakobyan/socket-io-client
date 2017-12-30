import { Injectable } from '@angular/core';
import { has } from 'lodash';

import { IEmitHistory } from '../interfaces/emit-history';
import { IEmitHistoryList } from '../interfaces/emit-history-list';

@Injectable()
export class EmitHistoryService {

  history: IEmitHistoryList = {};

  constructor() {
  }

  add(event: IEmitHistory, tabId: string) {
    if (!has(this.history, tabId)) {
      this.history[tabId] = new Set<IEmitHistory>();
    }
    this.history[tabId].add(event);
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
