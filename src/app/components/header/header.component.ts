import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';

import { SocketIoService } from '@modules/socket/socket.service';
import { getSelectedTabIndex } from '@selectors/tabs.selector';
import { TabsActions, SocketAppActions } from '@actions';
import { AppState } from '@store';
import { getConnectUrl } from '@selectors/socket-app.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public connectUrl: Store<string>;

  constructor(public socketIoService: SocketIoService, public store: Store<AppState>) {
    this.connectUrl = this.store.select(getConnectUrl);
  }

  ngOnInit() {
  }

  connect() {
    this.connectUrl.take(1)
      .switchMap(connectUrl => this.socketIoService.connect(connectUrl))
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
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
}
