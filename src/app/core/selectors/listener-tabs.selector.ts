import { createSelector } from '@ngrx/store';
import { ListenerTabsReducer } from '@reducers';
import { AppState } from '@store';
import { IListenerTab } from '@interfaces/listener-tab';

export const getListenerTabsState = (state: AppState) => state.listenerTabs;

export const getSelectedTabIndex = createSelector(getListenerTabsState, (state: ListenerTabsReducer.Tabs) => state.selectedTabIndex);
export const getAllTabs = createSelector(getListenerTabsState, (state: ListenerTabsReducer.Tabs) => state.tabs);

export const getSelectedTab = createSelector(getAllTabs, getSelectedTabIndex,
  (tabs: IListenerTab[], selectedTabIndex: number) => tabs.find(tab => tab.index === selectedTabIndex));

export const getTab = (tabIndex: number) => createSelector(getAllTabs,
  (tabs: IListenerTab[]) => tabs.find(tab => tab.index === tabIndex));

export const getSelectedListenName = createSelector(getSelectedTab,
  (selectedTab: IListenerTab) => selectedTab.listenName);

export const getTabListenName = (tabIndex: number) => createSelector(getTab(tabIndex),
  (tab: IListenerTab) => tab.listenName);
