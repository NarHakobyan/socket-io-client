import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { PouchDbService } from '@modules/pouchdb/pouchdb.service';
import { SocketIoService } from '@modules/socket/socket.service';
import { Store } from '@ngrx/store';
import { ProgressBarService } from '@services/progress-bar.service';

const JSONEditor = require('jsoneditor');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('jsoneditor', {read: ElementRef}) jsoneditor: ElementRef;


  private editor;
  public eventName = '';
  public channel = '';
  public lastResult = '';
  public socketUrl = 'http://localhost:8080';


  constructor(public socketIoService: SocketIoService,
              public pouchDbService: PouchDbService,
              private store: Store<any>,
              public progressBarService: ProgressBarService) {
    (<any>window).store = store;
    (<any>window).progressBarService = progressBarService;
  }


  ngAfterViewInit(): void {
    this.editor = new JSONEditor(this.jsoneditor.nativeElement, {
      mode: 'code'
    });

    // set json
    const json = {
      'Array': [1, 2, 3],
      'Boolean': true,
      'Null': null,
      'Number': 123,
      'Object': {'a': 'b', 'c': 'd'},
      'String': 'Hello World'
    };
    (<any>window).editor = this.editor;
    this.editor.set(json);


  }

  connect() {
    this.socketIoService.connect(this.socketUrl).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  get() {
    return this.editor.get();
  }

  emit() {
    this.socketIoService.emit(this.eventName, this.get()).then(result => {
      this.lastResult = result;
    });
  }

  disconnect() {
    this.socketIoService.disconnect();
  }
}
