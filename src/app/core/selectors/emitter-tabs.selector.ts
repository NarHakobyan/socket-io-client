import { ITab } from '@interfaces/tab';
import { createSelector } from '@ngrx/store';
import { EmitterTabsReducer } from '@reducers';
import { AppState } from '@store';

export const getTabsState = (state: AppState) => state.tabs;

export const getSelectedTabIndex = createSelector(getTabsState, (state: EmitterTabsReducer.Tabs) => state.selectedTabIndex);
export const getAllTabs = createSelector(getTabsState, (state: EmitterTabsReducer.Tabs) => state.tabs);

export const getSelectedTab = createSelector(getAllTabs, getSelectedTabIndex,
  (tabs: ITab[], selectedTabIndex: number) => tabs.find(tab => tab.index === selectedTabIndex));

export const getTab = (tabIndex: number) => createSelector(getAllTabs,
  (tabs: ITab[]) => tabs.find(tab => tab.index === tabIndex));

export const getSelectedEventName = createSelector(getSelectedTab,
  (selectedTab: ITab) => selectedTab.emitName);

export const getSelectedEventBody = createSelector(getSelectedTab,
  (selectedTab: ITab) => selectedTab.emitBody);

export const getTabEmitName = (tabIndex: number) => createSelector(getTab(tabIndex),
  (tab: ITab) => tab.emitName);

export const getTabEmitBody = (tabIndex: number) => createSelector(getTab(tabIndex),
  (tab: ITab) => tab.emitBody);
