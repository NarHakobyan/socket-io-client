import { push, set, map, filter } from 'immutadot';
import { cloneDeep } from 'lodash';

import { generate } from 'shortid';
import { ListenHistoryActions } from '../actions';
import { IListen } from '@interfaces/listen';

namespace Reducer {

  export interface ListenHistory {
    history: IListen[];
  }

  const initialState: ListenHistory = {
    history: []
  };


  export function listenHistoryReducer(state: ListenHistory = initialState, action: ListenHistoryActions.All) {
    switch (action.type) {
      case ListenHistoryActions.ADD:
        const event: IListen = cloneDeep(action.payload);
        event.created = new Date();
        event.id = generate();
        return push(state, 'history', event);
      case ListenHistoryActions.REMOVE:
        return filter(state, 'history', e => e.id !== this.payload.eventId);
      case ListenHistoryActions.REMOVE_ALL:
        return set(state, 'history', []);
      case ListenHistoryActions.CHANGE_STATE:
        return cloneDeep(action.payload);
      default:
        return state;

    }
  }
}
export default Reducer;
