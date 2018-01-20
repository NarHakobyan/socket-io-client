import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { getTabListenName } from '@selectors/listener-tabs.selector';
import { SocketIoService } from '@modules/socket/socket.service';
import { AppState } from '@store';

@Injectable()
export class ListenerService {

  constructor(public store: Store<AppState>,
              private socketIoService: SocketIoService) {
  }


  getListenName(tabIndex: number): Store<string> {
    return this.store.select(getTabListenName(tabIndex));
  }

  listen(listenName: string): Observable<object> {
    return this.socketIoService.on(listenName);
  }

}
