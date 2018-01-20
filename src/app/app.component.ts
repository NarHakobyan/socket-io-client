import { MatSidenav } from '@angular/material';
import { Component, ViewChild, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProgressBarService } from '@services/progress-bar.service';
import { PouchDbService } from '@modules/pouchdb/pouchdb.service';
import { SocketIoService } from '@modules/socket/socket.service';
import { AppState } from '@store';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { FileService } from '@services/file.service';
import { StateService } from '@services';


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
              public fileService: FileService,
              private store: Store<AppState>,
              private stateService: StateService,
              private router: Router,
              public progressBarService: ProgressBarService) {
    (<any>window).store = store;
    (<any>window).progressBarService = progressBarService;
    (<any>window).app = this;
  }

  close() {
    this.sidenav.close();
  }

  openEmitterPage() {
    this.router.navigate(['emitter']);
  }

  exportState() {
    this.stateService.exports();
  }

  importState(changeEvent) {
    const target = changeEvent.target;
    this.stateService.imports(target);
  }

  openListenerPage() {
    this.router.navigate(['listener']);
  }
}
