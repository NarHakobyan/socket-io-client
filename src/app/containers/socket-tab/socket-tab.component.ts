import { AfterViewInit, Component, Input, QueryList, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { EventPayloadDialogComponent } from 'app/components/event-payload/event-payload.component';
import { JsonEditorComponent } from 'app/components/jsoneditor/jsoneditor.component';
import { IEvent } from 'app/interfaces/event';
import { SocketIoService } from 'app/modules/socket/socket.service';
import { Store } from '@ngrx/store';
import { getSelectedEvents } from 'app/core/selectors/emit-history.selector';
import { getSelectedTabIndex } from 'app/core/selectors/tabs.selector';
import { EmitHistoryService } from 'app/services/emit-history.service';
import { AppState } from '@store';

@Component({
  selector: 'app-socket-tab',
  templateUrl: './socket-tab.component.html',
  styleUrls: ['./socket-tab.component.scss']
})
export class SocketTabComponent implements AfterViewInit {
  @ViewChild(JsonEditorComponent) jsonEditors: QueryList<JsonEditorComponent>;
  @Input() tabId: string;

  public data = {a: 12};
  public emitEventName = '';
  public emitChannelName = '';
  public selectedTabIndex: Store<number>;
  public emitHistory: Store<IEvent[]>;

  constructor(public socketIoService: SocketIoService,
              public emitHistoryService: EmitHistoryService,
              public store: Store<AppState>,
              public dialog: MatDialog) {
    this.emitHistory = this.store.select(getSelectedEvents);
    this.selectedTabIndex = this.store.select(getSelectedTabIndex);
  }

  ngAfterViewInit(): void {
    console.log('this.jsonEditors', this.jsonEditors);
  }

  addToHistory(event: IEvent) {
    this.emitHistoryService.add(event).then(() => {
      console.log('done');
    });
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

  private _emit(event: IEvent, options: { addToHistory: boolean } = {addToHistory: true}): Promise<any> {
    if (options.addToHistory) {
      this.addToHistory(event);
    }
    return this.socketIoService.emit(event.emitEventName, event.data);
  }

}
