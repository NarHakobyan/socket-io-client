import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';

import { SocketIoService } from '@modules/socket/socket.service';
import { getSelectedTabIndex } from '@selectors/tabs.selector';
import { TabsActions } from '@actions';
import { AppState } from '@store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public socketUrl = 'http://localhost:8080';

  constructor(public socketIoService: SocketIoService, public store: Store<AppState>) {
  }

  ngOnInit() {
  }

  connect() {
    this.socketIoService.connect(this.socketUrl).subscribe(
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
}
