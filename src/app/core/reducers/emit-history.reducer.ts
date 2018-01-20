import { push, set, map, filter } from 'immutadot';
import { cloneDeep } from 'lodash';

import { IEvent } from '@interfaces/event';
import { generate } from 'shortid';
import { EmitHistoryActions } from '../actions';

namespace Reducer {

  export interface EmitHistory {
    events: IEvent[];
  }

  const initialState: EmitHistory = {
    events: []
  };


  export function eventHistoryReducer(state: EmitHistory = initialState, action: EmitHistoryActions.All) {
    switch (action.type) {
      case EmitHistoryActions.ADD:
        const event: IEvent = cloneDeep(action.payload);
        event.created = new Date();
        event.id = generate();
        return push(state, 'events', event);
      case EmitHistoryActions.REMOVE:
        return filter(state, 'events', e => e.id !== this.payload.eventId);
      case EmitHistoryActions.EDIT_PAYLOAD:
        return map(state, 'events', e => {
          if (e.id === action.payload.eventId) {
            return set(e, 'data', action.payload);
          }
          return e;
        });
      case EmitHistoryActions.REMOVE_ALL:
        return set(state, 'events', []);
      case EmitHistoryActions.CHANGE_STATE:
        return cloneDeep(action.payload);
      default:
        return state;

    }
  }
}
export default Reducer;
