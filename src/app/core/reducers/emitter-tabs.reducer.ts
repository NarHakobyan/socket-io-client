import { EmitterTabsActions } from '@actions';
import { ITab } from '@interfaces/tab';
import { cloneDeep } from 'lodash';

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
    const newState: Tabs = cloneDeep(state);
    switch (action.type) {
      case EmitterTabsActions.ADD:
        newState.tabs.push({index: newState.tabs.length, name: action.payload.name, emitName: '', emitBody: {a: 'new'}});
        return newState;
      case EmitterTabsActions.REMOVE:
        newState.tabs.splice(action.payload.index, 1);
        return newState;
      case EmitterTabsActions.SELECT_TAB:
        newState.selectedTabIndex = action.payload.index;
        return newState;
      case EmitterTabsActions.CHANGE_EMIT_NAME:
        newState.tabs[action.payload.tabIndex].emitName = action.payload.name;
        return newState;
      case EmitterTabsActions.CHANGE_EMIT_BODY:
        newState.tabs[action.payload.tabIndex].emitBody = action.payload.body;
        return newState;
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
