import { AfterViewInit, Component, Input, QueryList, ViewChild } from '@angular/core';
import { SocketIoService } from '@modules/socket/socket.service';
import { EmitHistoryService } from '@services/emit-history.service';
import { JsonEditorComponent } from '../jsoneditor/jsoneditor.component';

@Component({
  selector: 'app-socket-tab',
  templateUrl: './socket-tab.component.html',
  styleUrls: ['./socket-tab.component.css']
})
export class SocketTabComponent implements AfterViewInit {
  @ViewChild(JsonEditorComponent) jsonEditors: QueryList<JsonEditorComponent>;
  @Input() tabId: string;

  public data = {a: 12};
  public lastResult = '';
  public emitEventName = '';
  public emitChannelName = '';
  public listenEventName = '';
  public listenChannelName = '';

  constructor(public socketIoService: SocketIoService, public emitHistoryService: EmitHistoryService) {
  }

  ngAfterViewInit(): void {
    console.log('this.jsonEditors', this.jsonEditors);
  }

  emit() {
    this.socketIoService.emit(this.emitEventName, this.data).then(result => {
      this.lastResult = result;
    });
  }

  listen() {
    // todo: integrate listen functionality
  }

}
