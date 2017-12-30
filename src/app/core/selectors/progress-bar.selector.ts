import { createSelector } from '@ngrx/store';
import { ProgressBarReducer } from '@reducers';
import { AppState } from '@store';

export const getProgressBarState = (state: AppState) => state.progressBar;

const getProgressBarShowState = (state: ProgressBarReducer.ProgressBarState) => state.show;

export const showProgressBar = createSelector(getProgressBarState, getProgressBarShowState);
