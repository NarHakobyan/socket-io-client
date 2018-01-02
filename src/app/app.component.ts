import { TabsActions } from '@actions';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatTabChangeEvent } from '@angular/material';
import { ISingleEvent } from '@interfaces/single-event';
import { PouchDbService } from '@modules/pouchdb/pouchdb.service';
import { SocketIoService } from '@modules/socket/socket.service';
import { Store } from '@ngrx/store';

import { getAllTabs, getSelectedTabIndex } from '@selectors/tabs.selector';
import { ProgressBarService } from '@services/progress-bar.service';
import { isEmpty } from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('sidenav') sidenav: MatSidenav;

  public tabs: Store<ISingleEvent[]>;


  constructor(public socketIoService: SocketIoService,
              public pouchDbService: PouchDbService,
              private store: Store<any>,
              public progressBarService: ProgressBarService) {
    this.tabs = this.store.select(getAllTabs);
    (<any>window).store = store;
    (<any>window).progressBarService = progressBarService;
    (<any>window).app = this;
  }

  close(reason: string) {
    this.sidenav.close();
  }

  tabChange(event: MatTabChangeEvent) {
    this.store.dispatch(new TabsActions.SelectTab({index: event.index}));
  }

  trackTabs(index: number, item: ISingleEvent) {
    return item.index;
  }

  addTab(name: string) {
    if (isEmpty(name)) {
      name = 'Tab';
    }
    this.store.dispatch(new TabsActions.Add({index: 1, name}));
  }

  closeTab() {
    this.store.select(getSelectedTabIndex).take(1).subscribe(index => {
      this.store.dispatch(new TabsActions.Remove({index}));
    });
  }
}
