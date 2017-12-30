import { EmitHistoryActions } from '@actions';
import { AfterViewInit, Component, Input, QueryList, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SocketIoService } from '@modules/socket/socket.service';
import { Store } from '@ngrx/store';
import { getAllEmitHistory } from '@selectors/emit-history.selector';
import { EmitHistoryService } from '@services/emit-history.service';
import { AppState } from '@store';
import { IEvent } from '../../interfaces/event';
import { EventPayloadDialogComponent } from '../event-payload/event-payload.component';
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
  public emitHistory;
  public emitEventName = '';
  public emitChannelName = '';
  public listenEventName = '';
  public listenChannelName = '';

  constructor(public socketIoService: SocketIoService,
              public emitHistoryService: EmitHistoryService,
              public store: Store<AppState>,
              public dialog: MatDialog) {
    this.emitHistory = this.store.select(getAllEmitHistory);
  }

  ngAfterViewInit(): void {
    console.log('this.jsonEditors', this.jsonEditors);
  }

  emit() {
    this.socketIoService.emit(this.emitEventName, this.data).then(result => {
      this.lastResult = result;
      this.openPayload(result);
      this.store.dispatch(new EmitHistoryActions.Add({
        emitEventName: this.emitEventName,
        emitChannelName: this.emitChannelName,
        data: this.data
      }));
    });
  }


  emitFromHistory(event: IEvent) {
    this.socketIoService.emit(event.emitEventName, event.data).then(result => {
      this.lastResult = result;
      this.openPayload(result);
    });
  }

  listen() {
    // todo: integrate listen functionality
  }

  openPayload(data) {
    const dialogRef = this.dialog.open(EventPayloadDialogComponent, {
      width: '60%',
      height: '400px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
