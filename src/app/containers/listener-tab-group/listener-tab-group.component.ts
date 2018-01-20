import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { isEmpty } from 'lodash';

import { ListenerTabsService } from '@services';
import { IListenerTab } from '@interfaces/listener-tab';

@Component({
  selector: 'app-listener-tab-group',
  templateUrl: './listener-tab-group.component.html',
  styleUrls: ['./listener-tab-group.component.scss']
})
export class ListenerTabGroupComponent {


  public tabs = this.listenerTabsService.getAllTabs();

  constructor(public listenerTabsService: ListenerTabsService) {
  }

  tabChange(event: MatTabChangeEvent) {
    this.listenerTabsService.selectTab(event);
  }

  trackTabs(index: number, item: IListenerTab) {
    return item.index;
  }

  addTab(name: string) {
    if (isEmpty(name)) {
      name = 'Tab';
    }
    this.listenerTabsService.addTab(name);
  }

  closeSelectedTab() {
    if (confirm('are you sure you want to close the tab')) {
      this.listenerTabsService.closeSelectedTab();
    }
  }
}
