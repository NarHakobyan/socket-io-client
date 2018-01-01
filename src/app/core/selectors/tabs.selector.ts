import { ISingleEvent } from '@interfaces/single-event';
import { createSelector } from '@ngrx/store';
import { TabsReducer } from '@reducers';
import { AppState } from '@store';

export const getTabsState = (state: AppState) => state.tabs;

export const getSelectedTabIndex = createSelector(getTabsState, (state: TabsReducer.Tabs) => state.selectedTabIndex);
export const getAllTabs = createSelector(getTabsState, (state: TabsReducer.Tabs) => state.tabs);

export const getSelectedTab = createSelector(getAllTabs, getSelectedTabIndex,
  (tabs: ISingleEvent[], selectedTabIndex: number) => {
    return tabs.find(tab => tab.index === selectedTabIndex);
  });
