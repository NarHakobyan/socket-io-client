import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { isEmpty, get } from 'lodash';

import { EventPayloadDialogComponent, JsonEditorComponent } from '@components';
import { EmitHistoryService } from '@services/emit-history.service';
import { SocketIoService } from '@modules/socket/socket.service';
import { IEvent } from '@interfaces/event';
import { AppState } from '@store';
import { TabsActions } from '@actions';
import { EmitterService } from '@services/emitter.service';

@Component({
  selector: 'app-socket-tab',
  templateUrl: './socket-tab.component.html',
  styleUrls: ['./socket-tab.component.scss']
})
export class SocketTabComponent implements AfterViewInit {
  @ViewChild(JsonEditorComponent) jsonEditor: JsonEditorComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() tabIndex: number;

  public data = {a: 12};
  public emitEventName: Store<string>;
  public emitEventBody: Store<object>;
  public emitHistory: Store<IEvent[]>;
  dataSource = new MatTableDataSource<IEvent>();
  displayedColumns = ['emitEventName', 'created', 'payload', 'emit'];

  constructor(public socketIoService: SocketIoService,
              public emitHistoryService: EmitHistoryService,
              public emitterService: EmitterService,
              public store: Store<AppState>,
              public dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.emitHistory = this.emitHistoryService.getAll(this.tabIndex);
      this.emitEventName = this.emitterService.getEmitName(this.tabIndex);
      this.emitEventBody = this.emitterService.getEmitBody(this.tabIndex);
      this.emitHistory.subscribe(data => {
        this.dataSource.data = data;
      });
    }, 0);
    console.log('this.jsonEditor', this.jsonEditor);
  }

  addToHistory(event: IEvent) {
    this.emitHistoryService.add(event, this.tabIndex);
  }

  emit() {
    this.emitEventName.take(1).subscribe(emitEventName => {
      const event: IEvent = {
        emitEventName,
        data: this.data
      };
      this._emit(event).then(result => {
        if (isEmpty(result) === false) {
          this.openPayload(result).then(closeResult => {
            console.log(closeResult);
          });
        }
      });
    });
  }

  emitEventNameChange(name: string) {
    this.store.dispatch(new TabsActions.ChangeEmitName({name, tabIndex: this.tabIndex}));
  }

  emitFromHistory(event: IEvent) {
    this._emit(event, {addToHistory: false}).then(result => {
      if (isEmpty(result) === false) {
        this.openPayload(result).then(closeResult => {
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

  editPayload(event: IEvent) {
    this.openPayload(event.data, {editable: true}).then(result => {
      if (get(result, 'update') === true) {
        this.emitHistoryService.editPayload(event.id, result.data);
      }
    });
  }

  emitEventBodyChange(body: object) {
    console.log(body);
    this.store.dispatch(new TabsActions.ChangeEmitBody({tabIndex: this.tabIndex, body}));
  }
}
