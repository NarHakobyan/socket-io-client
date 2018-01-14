import { TabsActions } from '@actions';
import { ITab } from '@interfaces/tab';
import { cloneDeep } from 'lodash';

namespace Reducer {

  export interface Tabs {
    selectedTabIndex: number;
    tabs: ITab[];
  }

  const initialState: Tabs = {
    selectedTabIndex: 0,
    tabs: [{index: 0, name: 'Initial Tab', emitName: 'wroking', emitBody: {a: 'working'}}]
  };


  export function tabsReducer(state: Tabs = initialState, action: TabsActions.All) {
    const newState: Tabs = cloneDeep(state);
    switch (action.type) {
      case TabsActions.ADD:
        newState.tabs.push({index: newState.tabs.length, name: action.payload.name, emitName: '', emitBody: {a: 'new'}});
        return newState;
      case TabsActions.REMOVE:
        newState.tabs.splice(action.payload.index, 1);
        return newState;
      case TabsActions.SELECT_TAB:
        newState.selectedTabIndex = action.payload.index;
        return newState;
      case TabsActions.CHANGE_EMIT_NAME:
        newState.tabs[action.payload.tabIndex].emitName = action.payload.name;
        return newState;
      case TabsActions.CHANGE_EMIT_BODY:
        newState.tabs[action.payload.tabIndex].emitBody = action.payload.body;
        return newState;
      case TabsActions.REMOVE_ALL:
        return cloneDeep(initialState);
      default:
        return state;

    }
  }
}
export default Reducer;
