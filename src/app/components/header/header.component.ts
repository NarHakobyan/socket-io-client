import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';

import { TabsActions, SocketAppActions, ProgressBarActions } from '@actions';
import { SocketIoService } from '@modules/socket/socket.service';
import { getSelectedTabIndex } from '@selectors/tabs.selector';
import { getConnectUrl } from '@selectors/socket-app.selector';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from '@store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

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

  addTab(name: string) {
    if (isEmpty(name)) {
      name = 'Tab';
    }
    this.store.dispatch(new TabsActions.Add({name}));
  }

  closeTab() {
    this.store.select(getSelectedTabIndex).take(1).subscribe(index => {
      this.store.dispatch(new TabsActions.Remove({index}));
    });
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
}
