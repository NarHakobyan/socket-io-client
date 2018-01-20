import { Injectable } from '@angular/core';
import { getAllTabs, getSelectedTabIndex } from '@selectors/emitter-tabs.selector';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { EmitterTabsActions } from '@actions';
import { ITab } from '@interfaces/tab';
import { Exportable } from '@interfaces/exportable';

@Injectable()
export class TabsService implements Exportable {
  constructor(private store: Store<AppState>) {
  }

  updateState(state: object): void {
    this.store.dispatch(new EmitterTabsActions.ChangeState(state));
  }

  public getAllTabs() {
    return this.store.select(getAllTabs);
  }

  public selectTab(event: ITab) {
    return this.store.dispatch(new EmitterTabsActions.SelectTab({index: event.index}));
  }

  public addTab(name: string) {
    return this.store.dispatch(new EmitterTabsActions.Add({name}));
  }

  public getSelectedTab() {
    return this.store.select(getSelectedTabIndex);
  }

  public closeSelectedTab() {
    return this.getSelectedTab().take(1).subscribe(index => this.closeTab(index));
  }

  public closeTab(index: number) {
    return this.store.dispatch(new EmitterTabsActions.Remove({index}));
  }

}
