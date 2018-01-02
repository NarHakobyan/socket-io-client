import { MatTabChangeEvent } from '@angular/material';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ISingleEvent } from '@interfaces/single-event';
import { getAllTabs } from '@selectors/tabs.selector';
import { TabsActions } from '@actions';
import { AppState } from '@store';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent {
  public tabs: Store<ISingleEvent[]>;

  constructor(private store: Store<AppState>) {
    this.tabs = this.store.select(getAllTabs);
  }

  tabChange(event: MatTabChangeEvent) {
    this.store.dispatch(new TabsActions.SelectTab({index: event.index}));
  }

  trackTabs(index: number, item: ISingleEvent) {
    return item.index;
  }

}
