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

  addToHistory(event: IEvent) {
    this.store.dispatch(new EmitHistoryActions.Add(event));
  }

  emit() {
    const event: IEvent = {
      emitEventName: this.emitEventName,
      emitChannelName: this.emitChannelName,
      data: this.data
    };
    this._emit(event).then(result => {
      if (result) {
        this.openPayload(result);
      }
    });
  }


  emitFromHistory(event: IEvent) {
    this._emit(event, {addToHistory: false}).then(result => {
      if (result) {
        this.openPayload(result, {editable: true});
      }
    });
  }

  openPayload(result, options: { editable: boolean } = {editable: false}) {
    const dialogRef = this.dialog.open(EventPayloadDialogComponent, {
      width: '60%',
      height: '400px',
      data: {result, options}
    });

    dialogRef.afterClosed().subscribe(closeResult => {
      // todo: implement eventEdit action
      console.log(closeResult);
    });
  }

  listen() {
    // todo: integrate listen functionality
  }

  private _emit(event: IEvent, options: { addToHistory: boolean } = {addToHistory: true}): Promise<any> {
    if (options.addToHistory) {
      this.addToHistory(event);
    }
    return this.socketIoService.emit(event.emitEventName, event.data);
  }

}
