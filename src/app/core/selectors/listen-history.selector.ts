import { createSelector } from '@ngrx/store';
import { IListen } from '@interfaces/listen';

import { ListenHistoryReducer } from '@reducers';
import { getSelectedTabIndex } from '@selectors/listener-tabs.selector';
import { AppState } from '@store';

export const getListenHistoryState = (state: AppState) => state.listenHistory;

export const getEvents = createSelector(getListenHistoryState, (state: ListenHistoryReducer.ListenHistory) => state.history);

export const getSelectedEvents = createSelector(getEvents, getSelectedTabIndex,
  (histories: IListen[], selectedTabIndex: number) => histories.filter(history => history.tabIndex === selectedTabIndex));

export const getTabEvents = (tabIndex: number) => createSelector(getEvents,
  (histories: IListen[]) => histories.filter(history => history.tabIndex === tabIndex));
