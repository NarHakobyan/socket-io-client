import { createSelector } from '@ngrx/store';
import { SocketAppReducer } from '@reducers';
import { AppState } from '@store';

export const getSocketAppState = (state: AppState) => state.socketApp;

export const getConnectUrl = createSelector(getSocketAppState, (state: SocketAppReducer.SocketApp) => state.connectUrl);
