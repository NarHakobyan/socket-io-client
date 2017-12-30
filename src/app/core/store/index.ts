import { EmitHistoryReducer, ProgressBarReducer } from '@reducers';

export interface AppState {
  progressBar: ProgressBarReducer.ProgressBarState;
  emitHistory: EmitHistoryReducer.EmitHistory;
}
