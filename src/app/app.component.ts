import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { PouchDbService } from '@modules/pouchdb/pouchdb.service';
import { SocketIoService } from '@modules/socket/socket.service';
import { Store } from '@ngrx/store';
import { ProgressBarService } from '@services/progress-bar.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public socketUrl = 'http://localhost:8080';
  @ViewChild('sidenav') sidenav: MatSidenav;


  constructor(public socketIoService: SocketIoService,
              public pouchDbService: PouchDbService,
              private store: Store<any>,
              public progressBarService: ProgressBarService) {
    (<any>window).store = store;
    (<any>window).progressBarService = progressBarService;
    (<any>window).app = this;
  }
  connect() {
    this.socketIoService.connect(this.socketUrl).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  close(reason: string) {
    this.sidenav.close();
  }

  disconnect() {
    this.socketIoService.disconnect();
  }
}
