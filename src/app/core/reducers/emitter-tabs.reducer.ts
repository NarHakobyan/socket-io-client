import { push, set, map, filter, splice } from 'immutadot';
import { cloneDeep } from 'lodash';

import { EmitterTabsActions } from '@actions';
import { ITab } from '@interfaces/tab';

namespace Reducer {

  export interface Tabs {
    selectedTabIndex: number;
    tabs: ITab[];
  }

  const initialState: Tabs = {
    selectedTabIndex: 0,
    tabs: [{index: 0, name: 'Initial Tab', emitName: '', emitBody: {}}]
  };


  export function tabsReducer(state: Tabs = initialState, action: EmitterTabsActions.All) {
    switch (action.type) {
      case EmitterTabsActions.ADD:
        return push(state, 'tabs', {index: state.tabs.length, name: action.payload.name, emitName: '', emitBody: {a: 'new'}});
      case EmitterTabsActions.REMOVE:
        return splice(state, 'tabs', action.payload.index, 1);
      case EmitterTabsActions.SELECT_TAB:
        return set(state, 'selectedTabIndex', action.payload.index);
      case EmitterTabsActions.CHANGE_EMIT_NAME:
        return set(state, `tabs[${action.payload.tabIndex}].emitName`, action.payload.name);
      case EmitterTabsActions.CHANGE_EMIT_BODY:
        return set(state, `tabs[${action.payload.tabIndex}].emitBody`, action.payload.body);
      case EmitterTabsActions.REMOVE_ALL:
        return cloneDeep(initialState);
      case EmitterTabsActions.CHANGE_STATE:
        return cloneDeep(action.payload);
      default:
        return state;

    }
  }
}
export default Reducer;
