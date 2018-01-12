import { createSelector } from '@ngrx/store';
import { EmitterReducer } from '@reducers';
import { getSelectedTabIndex } from '@selectors/tabs.selector';
import { AppState } from '@store';
import { find } from 'lodash';

export const getEmitterState = (state: AppState) => state.emitter;

const getNames = createSelector(getEmitterState, (state: EmitterReducer.Emitter) => state.names);
const getBodies = createSelector(getEmitterState, (state: EmitterReducer.Emitter) => state.bodies);

export const getSelectedEventName = createSelector(getNames, getSelectedTabIndex,
  (names: EmitterReducer.EmitName[], selectedTabIndex: number) => {
    const data = find(names, {tabIndex: selectedTabIndex});
    return data.name;
  });

export const getSelectedEventBody = createSelector(getBodies, getSelectedTabIndex,
  (bodies: EmitterReducer.EmitBody[], selectedTabIndex: number) => {
    const data = find(bodies, {tabIndex: selectedTabIndex});
    return data.body;
  });
