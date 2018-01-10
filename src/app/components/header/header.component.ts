import { Component, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';

import { SocketAppActions, ProgressBarActions } from '@actions';
import { SocketIoService } from '@modules/socket/socket.service';
import { getConnectUrl } from '@selectors/socket-app.selector';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from '@store';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  @Input() sidenav: MatSidenav;

  public connectUrl: Store<string>;

  constructor(public socketIoService: SocketIoService, public store: Store<AppState>) {
    this.connectUrl = this.store.select(getConnectUrl);

    /*    this.subscriptions = this.socketIoService.connected
          .subscribe((connected) => {
            if (connected) {
              this.store.dispatch(new ProgressBarActions.Hide());
            }
          });*/

    this.subscriptions = this.socketIoService.connecting().debounceTime(500)
      .subscribe(connecting => {
        if (connecting) {
          this.store.dispatch(new ProgressBarActions.Show());
        } else {
          this.store.dispatch(new ProgressBarActions.Hide());
        }
      });
  }

  private _subscriptions: Subscription[] = [];

  set subscriptions(value: Subscription) {
    this._subscriptions.push(value);
  }

  connect() {
    this.connectUrl.take(1)
      .subscribe(connectUrl => this.socketIoService.connect(connectUrl));
  }

  disconnect() {
    this.socketIoService.disconnect();
  }

  connectUrlChange(text: string) {
    this.store.dispatch(new SocketAppActions.SetConnectUrl({connectUrl: text.trim()}));
  }

  ngOnDestroy(): void {
    if (!isEmpty(this._subscriptions)) {
      for (const subscription of this._subscriptions) {
        subscription.unsubscribe();
      }
      this._subscriptions = [];
    }
  }

  showSideBar() {
    this.sidenav.toggle();
  }
}
