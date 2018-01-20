import { Injectable } from '@angular/core';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { pick, keys, entries, isEmpty } from 'lodash';
import { FileService } from '@services/file.service';
import { EmitHistoryService } from '@services/emit-history.service';
import { EmitterTabsService } from '@services/emitter-tabs.service';
import { Exportable } from '@interfaces/exportable';
import { ListenerTabsService } from '@services/listener-tabs.service';

@Injectable()
export class StateService {

  private exportState: { [key: string]: Exportable } = {
    emitHistory: this.emitHistoryService,
    emitterTabs: this.emitterTabsService,
    listenerTabs: this.listenerTabsService
  };

  constructor(private store: Store<AppState>,
              private emitHistoryService: EmitHistoryService,
              private emitterTabsService: EmitterTabsService,
              private listenerTabsService: ListenerTabsService,
              private fileService: FileService) {
  }

  exports(): void {
    this.store.take(1).subscribe(data => {
      const newData = pick(data, keys(this.exportState));
      this.fileService.downloadJson(newData);
    });
  }

  imports(target) {
    this.fileService.readJson(target).then((data) => {
      for (const [key, state] of entries(data)) {
        const service = this.exportState[key];
        if (isEmpty(service)) {
          continue;
        }
        service.updateState(state);
      }
    });
  }

}
