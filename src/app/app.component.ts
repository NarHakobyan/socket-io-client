import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SocketIoService } from './socket/socket.service';

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
  public socketUrl = 'http://localhost:3000';
  public connected = this.socketIoService.connected;


  constructor(public socketIoService: SocketIoService) {
  }


  ngAfterViewInit(): void {
    console.log(this.jsoneditor);
    const container = document.getElementById('jsoneditor');
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
    console.log(this.socketUrl);
    this.socketIoService.connect('http://localhost:8080').subscribe(
      data => console.log(data),
      error => console.log(error),
      c => console.log('complete', c),
    );
  }

  get() {
    const json = this.editor.get();
    console.log(json);
    return json;
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
