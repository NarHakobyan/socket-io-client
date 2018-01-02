import { MatSidenav } from '@angular/material';
import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProgressBarService } from '@services/progress-bar.service';
import { PouchDbService } from '@modules/pouchdb/pouchdb.service';
import { SocketIoService } from '@modules/socket/socket.service';
import { AppState } from '@store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(public socketIoService: SocketIoService,
              public pouchDbService: PouchDbService,
              private store: Store<AppState>,
              public progressBarService: ProgressBarService) {
    (<any>window).store = store;
    (<any>window).progressBarService = progressBarService;
    (<any>window).app = this;
  }

  close() {
    this.sidenav.close();
  }
}
