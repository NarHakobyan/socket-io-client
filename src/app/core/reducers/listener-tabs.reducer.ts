import { push, set, map, filter, splice } from 'immutadot';
import { cloneDeep } from 'lodash';

import { IListenerTab } from '@interfaces/listener-tab';
import { ListenerTabsActions } from '@actions';

namespace Reducer {

  export interface Tabs {
    selectedTabIndex: number;
    tabs: IListenerTab[];
  }

  const initialState: Tabs = {
    selectedTabIndex: 0,
    tabs: [{index: 0, name: 'Initial Tab', listenName: ''}]
  };


  export function ListenerTabsReducer(state: Tabs = initialState, action: ListenerTabsActions.All) {
    switch (action.type) {
      case ListenerTabsActions.ADD:
        return push(state, 'tabs', {index: state.tabs.length, name: action.payload.name, listenName: ''});
      case ListenerTabsActions.REMOVE:
        return splice(state, 'tabs', action.payload.index, 1);
      case ListenerTabsActions.SELECT_TAB:
        return set(state, 'selectedTabIndex', action.payload.index);
      case ListenerTabsActions.CHANGE_LISTEN_NAME:
        return set(state, `tabs[${action.payload.tabIndex}].listenName`, action.payload.name);
      case ListenerTabsActions.REMOVE_ALL:
        return cloneDeep(initialState);
      case ListenerTabsActions.CHANGE_STATE:
        return cloneDeep(action.payload);
      default:
        return state;

    }
  }
}
export default Reducer;
