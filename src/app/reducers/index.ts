import * as ProgressBar from './progress-bar.reducer';

export interface AppState {
  progressBar: ProgressBar.ProgressBarState;
}

export const appReducer = {
  progressBar: ProgressBar.progressBarReducer
};

export const getProgressBarState = (state: AppState) => state.progressBar;


