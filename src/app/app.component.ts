import { MatSidenav, MatTabChangeEvent } from '@angular/material';
import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProgressBarService } from '@services/progress-bar.service';
import { PouchDbService } from '@modules/pouchdb/pouchdb.service';
import { SocketIoService } from '@modules/socket/socket.service';
import { ISingleEvent } from '@interfaces/single-event';
import { getAllTabs } from '@selectors/tabs.selector';
import { TabsActions } from '@actions';


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

  close() {
    this.sidenav.close();
  }

  tabChange(event: MatTabChangeEvent) {
    this.store.dispatch(new TabsActions.SelectTab({index: event.index}));
  }

  trackTabs(index: number, item: ISingleEvent) {
    return item.index;
  }
}
