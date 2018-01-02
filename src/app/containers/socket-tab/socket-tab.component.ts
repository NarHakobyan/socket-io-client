import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';

import { EventPayloadDialogComponent, JsonEditorComponent } from '@components';
import { EmitHistoryService } from '@services/emit-history.service';
import { SocketIoService } from '@modules/socket/socket.service';
import { IEvent } from '@interfaces/event';
import { AppState } from '@store';

@Component({
  selector: 'app-socket-tab',
  templateUrl: './socket-tab.component.html',
  styleUrls: ['./socket-tab.component.scss']
})
export class SocketTabComponent implements AfterViewInit {
  @ViewChild(JsonEditorComponent) jsonEditor: JsonEditorComponent;
  @Input() tabIndex: number;

  public data = {a: 12};
  public emitEventName = '';
  public emitChannelName = '';
  public emitHistory: Store<IEvent[]>;

  constructor(public socketIoService: SocketIoService,
              public emitHistoryService: EmitHistoryService,
              public store: Store<AppState>,
              public dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.emitHistory = this.emitHistoryService.getAll(this.tabIndex);
    }, 0);
    console.log('this.jsonEditor', this.jsonEditor);
  }

  addToHistory(event: IEvent) {
    this.emitHistoryService.add(event, this.tabIndex).then(() => {
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
      if (isEmpty(result) === false) {
        this.openPayload(result).then(closeResult => {
          console.log(closeResult);
        });
      }
    });
  }


  emitFromHistory(event: IEvent) {
    this._emit(event, {addToHistory: false}).then(result => {
      if (isEmpty(result) === false) {
        this.openPayload(result, {editable: true}).then(closeResult => {
          // todo: implement eventEdit action
          console.log(closeResult);
        });
      }
    });
  }

  openPayload(result, options: { editable: boolean } = {editable: false}) {
    const dialogRef = this.dialog.open(EventPayloadDialogComponent, {
      width: '60%',
      height: '400px',
      data: {result, options}
    });

    return dialogRef.afterClosed().toPromise();
  }

  private _emit(event: IEvent, options: { addToHistory: boolean } = {addToHistory: true}): Promise<any> {
    if (options.addToHistory) {
      this.addToHistory(event);
    }
    return this.socketIoService.emit(event.emitEventName, event.data);
  }

}
