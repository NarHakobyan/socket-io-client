import { EmitHistoryReducer, ProgressBarReducer, TabsReducer, SocketAppReducer } from '@reducers';

export interface AppState {
  progressBar: ProgressBarReducer.ProgressBarState;
  emitHistory: EmitHistoryReducer.EmitHistory;
  tabs: TabsReducer.Tabs;
  socketApp: SocketAppReducer.SocketApp;
}

export const appReducer = {
  progressBar: ProgressBarReducer.progressBarReducer,
  emitHistory: EmitHistoryReducer.eventHistoryReducer,
  tabs: TabsReducer.tabsReducer,
  socketApp: SocketAppReducer.socketAppReducer,
};
