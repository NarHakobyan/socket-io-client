import { EmitHistoryReducer, ProgressBarReducer, EmitterTabsReducer, SocketAppReducer } from '@reducers';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from 'environments/environment';

export interface AppState {
  progressBar: ProgressBarReducer.ProgressBarState;
  emitHistory: EmitHistoryReducer.EmitHistory;
  tabs: EmitterTabsReducer.Tabs;
  socketApp: SocketAppReducer.SocketApp;
}

export const reducers: ActionReducerMap<AppState> = {
  progressBar: ProgressBarReducer.progressBarReducer,
  emitHistory: EmitHistoryReducer.eventHistoryReducer,
  tabs: EmitterTabsReducer.tabsReducer,
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
