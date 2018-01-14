import { MatTabChangeEvent } from '@angular/material';
import { Component } from '@angular/core';
import { isEmpty } from 'lodash';

import { ITab } from '@interfaces/tab';
import { TabsService } from '@services';

@Component({
  selector: 'app-emitter-tab-group',
  templateUrl: './emitter-tab-group.component.html',
  styleUrls: ['./emitter-tab-group.component.scss']
})
export class TabGroupComponent {
  public tabs = this.tabsService.getAllTabs();

  constructor(public tabsService: TabsService) {
  }

  tabChange(event: MatTabChangeEvent) {
    this.tabsService.selectTab(event);
  }

  trackTabs(index: number, item: ITab) {
    return item.index;
  }

  addTab(name: string) {
    if (isEmpty(name)) {
      name = 'Tab';
    }
    this.tabsService.addTab(name);
  }

  closeSelectedTab() {
    if (confirm('are you sure you want to close the tab')) {
      this.tabsService.closeSelectedTab();
    }
  }
}
