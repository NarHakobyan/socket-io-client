import { AfterViewInit, Component, QueryList, ViewChild } from '@angular/core';
import { SocketIoService } from '@modules/socket/socket.service';
import { JsonEditorComponent } from '../jsoneditor/jsoneditor.component';

@Component({
  selector: 'app-socket-tab',
  templateUrl: './socket-tab.component.html',
  styleUrls: ['./socket-tab.component.css']
})
export class SocketTabComponent implements AfterViewInit {
  @ViewChild(JsonEditorComponent) jsonEditors: QueryList<JsonEditorComponent>;

  public data = {a: 12};
  public lastResult = '';
  public eventName = '';
  public channel = '';
  public listenName = '';
  public listenChannel = '';

  constructor(public socketIoService: SocketIoService) {
  }

  ngAfterViewInit(): void {
    console.log('this.jsonEditors', this.jsonEditors);
  }

  emit() {
    this.socketIoService.emit(this.eventName, this.data).then(result => {
      this.lastResult = result;
    });
  }

  listen() {
    // todo: integrate listen functionality
  }

}
