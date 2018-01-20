import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Component, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { isEmpty } from 'lodash';
import { Store } from '@ngrx/store';

import { ListenerService, ListenHistoryService } from '@services';
import { SocketIoService } from '@modules/socket/socket.service';
import { EventPayloadDialogComponent } from '@components';
import { ListenerTabsActions } from '@actions';
import { IListen } from '@interfaces/listen';
import { AppState } from '@store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-listener-tab',
  templateUrl: './listener-tab.component.html',
  styleUrls: ['./listener-tab.component.scss']
})
export class ListenerTabComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() tabIndex: number;
  public listenName: Store<string>;
  public listenHistory: Store<IListen[]>;
  dataSource = new MatTableDataSource<IListen>();
  displayedColumns = ['id', 'created', 'data'];

  constructor(public socketIoService: SocketIoService,
              public listenHistoryService: ListenHistoryService,
              public listenerService: ListenerService,
              public store: Store<AppState>,
              public dialog: MatDialog) {
  }

  private _subscriptions: Subscription[] = [];

  set subscriptions(value: Subscription) {
    this._subscriptions.push(value);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.listenHistory = this.listenHistoryService.getAll(this.tabIndex);
      this.listenName = this.listenerService.getListenName(this.tabIndex);
      this.listenHistory.subscribe(data => {
        this.dataSource.data = data;
      });
    }, 0);
  }

  addToHistory(event: IListen) {
    this.listenHistoryService.add(event, this.tabIndex);
  }

  listen() {
    this.listenName.take(1).subscribe(listenName => {
      this.subscriptions = this.listenerService.listen(listenName).subscribe((data: object) => {
        if (data) {
          this.addToHistory({data, tabIndex: this.tabIndex, listenName});
        }
      });
    });
  }

  listenNameChange(name: string) {
    this.store.dispatch(new ListenerTabsActions.ChangeListenName({name, tabIndex: this.tabIndex}));
  }

  emitFromHistory(event: IListen) {
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

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  private _emit(event: IListen, options: { addToHistory: boolean } = {addToHistory: true}): Promise<any> {
    if (options.addToHistory) {
      this.addToHistory(event);
    }
    return this.socketIoService.emit(event.listenName, event.data);
  }

}
