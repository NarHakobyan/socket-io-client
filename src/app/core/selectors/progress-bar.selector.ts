import { createSelector } from '@ngrx/store';
import { ProgressBarReducer } from '@reducers';
import { AppState } from '@store';

export const getProgressBarState = (state: AppState) => state.progressBar;

export const showProgressBar = createSelector(getProgressBarState, (state: ProgressBarReducer.ProgressBarState) => state.show);
