import { IEvent } from '@interfaces/event';
import { createSelector } from '@ngrx/store';
import { EmitHistoryReducer } from '@reducers';
import { getSelectedTabIndex } from '@selectors/emitter-tabs.selector';
import { AppState } from '@store';

export const getEmitHistoryState = (state: AppState) => state.emitHistory;

export const getEvents = createSelector(getEmitHistoryState, (state: EmitHistoryReducer.EmitHistory) => state.events);

export const getSelectedEvents = createSelector(getEvents, getSelectedTabIndex,
  (events: IEvent[], selectedTabIndex: number) => events.filter(event => event.tabIndex === selectedTabIndex));

export const getTabEvents = (tabIndex: number) => createSelector(getEvents,
  (events: IEvent[]) => events.filter(event => event.tabIndex === tabIndex));
