import { EmitHistoryReducer, ProgressBarReducer, TabsReducer } from '@reducers';

export interface AppState {
  progressBar: ProgressBarReducer.ProgressBarState;
  emitHistory: EmitHistoryReducer.EmitHistory;
  tabs: TabsReducer.Tabs;
}
