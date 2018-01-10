import { MatTabChangeEvent } from '@angular/material';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ITab } from '@interfaces/tab';
import { getAllTabs, getSelectedTabIndex } from '@selectors/tabs.selector';
import { TabsActions } from '@actions';
import { AppState } from '@store';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-emitter-tab-group',
  templateUrl: './emitter-tab-group.component.html',
  styleUrls: ['./emitter-tab-group.component.scss']
})
export class TabGroupComponent {
  public tabs: Store<ITab[]>;

  constructor(private store: Store<AppState>) {
    this.tabs = this.store.select(getAllTabs);
  }

  tabChange(event: MatTabChangeEvent) {
    this.store.dispatch(new TabsActions.SelectTab({index: event.index}));
  }

  trackTabs(index: number, item: ITab) {
    return item.index;
  }


  addTab(name: string) {
    if (isEmpty(name)) {
      name = 'Tab';
    }
    this.store.dispatch(new TabsActions.Add({name}));
  }

  closeTab() {
    this.store.select(getSelectedTabIndex).take(1).subscribe(index => {
      this.store.dispatch(new TabsActions.Remove({index}));
    });
  }
}
