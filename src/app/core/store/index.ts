import {
  EmitHistoryReducer,
  ProgressBarReducer,
  EmitterTabsReducer,
  SocketAppReducer,
  ListenerTabsReducer,
  ListenHistoryReducer
} from '@reducers';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from 'environments/environment';

export interface AppState {
  progressBar: ProgressBarReducer.ProgressBarState;
  emitHistory: EmitHistoryReducer.EmitHistory;
  listenHistory: ListenHistoryReducer.ListenHistory;
  emitterTabs: EmitterTabsReducer.Tabs;
  listenerTabs: ListenerTabsReducer.Tabs;
  socketApp: SocketAppReducer.SocketApp;
}

export const reducers: ActionReducerMap<AppState> = {
  progressBar: ProgressBarReducer.progressBarReducer,
  emitHistory: EmitHistoryReducer.eventHistoryReducer,
  listenHistory: ListenHistoryReducer.listenHistoryReducer,
  emitterTabs: EmitterTabsReducer.emitterTabsReducer,
  listenerTabs: ListenerTabsReducer.ListenerTabsReducer,
  socketApp: SocketAppReducer.socketAppReducer,
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger, storeFreeze]
  : [];
