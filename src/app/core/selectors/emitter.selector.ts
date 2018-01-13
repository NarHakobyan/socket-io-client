import { createSelector } from '@ngrx/store';
import { EmitterReducer } from '@reducers';
import { getSelectedTabIndex } from '@selectors/tabs.selector';
import { AppState } from '@store';

export const getEmitterState = (state: AppState) => state.emitter;

const getContents = createSelector(getEmitterState, (state: EmitterReducer.Emitter) => state.contents);

export const getSelectedEventName = createSelector(getContents, getSelectedTabIndex,
  (contents: EmitterReducer.IContent[], selectedTabIndex: number) => {
    const data = contents[selectedTabIndex] || {};
    return data.name;
  });

export const getSelectedEventBody = createSelector(getContents, getSelectedTabIndex,
  (contents: EmitterReducer.IContent[], selectedTabIndex: number) => {
    const data = contents[selectedTabIndex] || {};
    return data.body;
  });

export const getTabEventName = (tabIndex: number) => createSelector(getContents,
  (contents: EmitterReducer.IContent[]) => {
    const data = contents[tabIndex] || {};
    return data.name;
  });

export const getTabEventBody = (tabIndex: number) => createSelector(getContents,
  (contents: EmitterReducer.IContent[]) => {
    const data = contents[tabIndex] || {};
    return data.body;
  });
