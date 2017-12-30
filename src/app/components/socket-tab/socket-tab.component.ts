import { Component, ElementRef, ViewChild } from '@angular/core';
import { SocketIoService } from '@modules/socket/socket.service';

@Component({
  selector: 'app-socket-tab',
  templateUrl: './socket-tab.component.html',
  styleUrls: ['./socket-tab.component.css']
})
export class SocketTabComponent {
  @ViewChild('jsoneditor', {read: ElementRef}) jsoneditor: ElementRef;

  public data = {a: 12};
  public lastResult = '';
  public eventName = '';
  public channel = '';

  constructor(public socketIoService: SocketIoService) {
  }

  emit() {
    this.socketIoService.emit(this.eventName, this.data).then(result => {
      this.lastResult = result;
    });
  }

}
