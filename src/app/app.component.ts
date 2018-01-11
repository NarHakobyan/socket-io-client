import { MatSidenav } from '@angular/material';
import { Component, ViewChild, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProgressBarService } from '@services/progress-bar.service';
import { PouchDbService } from '@modules/pouchdb/pouchdb.service';
import { SocketIoService } from '@modules/socket/socket.service';
import { AppState } from '@store';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('sidenav') sidenav: MatSidenav;

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    if (environment.production) {
      return confirm('don\'t close');
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    if (environment.production) {
      return confirm('don\'t close');
    }
  }

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
