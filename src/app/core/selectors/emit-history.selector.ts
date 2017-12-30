import { createSelector } from '@ngrx/store';
import { EmitHistoryReducer } from '@reducers';
import { AppState } from '@store';
import { isEmpty } from 'lodash';
import { IEvent } from '../../interfaces/event';

export const getEmitHistoryState = (state: AppState) => state.emitHistory;

const getSelectedTabId = createSelector(getEmitHistoryState, (state: EmitHistoryReducer.EmitHistory) => state.selectedTabId);
const getEvents = createSelector(getEmitHistoryState, (state: EmitHistoryReducer.EmitHistory) => state.events);

export const getAllEmitHistory = createSelector(getEvents, getSelectedTabId,
  (events: IEvent[], selectedTabId: string) => {
    if (!isEmpty(events) && selectedTabId) {
      return events.filter(event => event.tabId === selectedTabId);
    } else {
      return [];
    }
  });
