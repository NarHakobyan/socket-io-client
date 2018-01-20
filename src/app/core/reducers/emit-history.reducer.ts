import { IEvent } from '@interfaces/event';
import { cloneDeep } from 'lodash';
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
    const newState: EmitHistory = cloneDeep(state);
    switch (action.type) {
      case EmitHistoryActions.ADD:
        const event: IEvent = cloneDeep(action.payload);
        event.created = new Date();
        event.id = generate();
        newState.events.push(event);
        return newState;
      case EmitHistoryActions.REMOVE:
        newState.events = newState.events.filter(e => e.id !== this.payload.eventId);
        return newState;
      case EmitHistoryActions.EDIT_PAYLOAD:
        newState.events.forEach(e => {
          if (e.id === action.payload.eventId) {
            e.data = action.payload.data;
          }
        });
        return newState;
      case EmitHistoryActions.REMOVE_ALL:
        newState.events = [];
        return newState;
      case EmitHistoryActions.CHANGE_STATE:
        return cloneDeep(action.payload);
      default:
        return state;

    }
  }
}
export default Reducer;
