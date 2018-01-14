import { Injectable } from '@angular/core';
import { getAllTabs, getSelectedTabIndex } from '@selectors/tabs.selector';
import { AppState } from '@store';
import { Store } from '@ngrx/store';
import { TabsActions } from '@actions';
import { ITab } from '@interfaces/tab';

@Injectable()
export class TabsService {

  constructor(private store: Store<AppState>) {
  }

  public getAllTabs() {
    return this.store.select(getAllTabs);
  }

  public selectTab(event: ITab) {
    return this.store.dispatch(new TabsActions.SelectTab({index: event.index}));
  }

  public addTab(name: string) {
    return this.store.dispatch(new TabsActions.Add({name}));
  }

  public getSelectedTab() {
    return this.store.select(getSelectedTabIndex);
  }

  public closeSelectedTab() {
    return this.getSelectedTab().take(1).subscribe(index => this.closeTab(index));
  }

  public closeTab(index: number) {
    return this.store.dispatch(new TabsActions.Remove({index}));
  }

}
