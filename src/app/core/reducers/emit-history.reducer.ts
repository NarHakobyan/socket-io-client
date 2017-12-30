import { cloneDeep, isEmpty } from 'lodash';
import { generate } from 'shortid';
import { IEvent } from '../../interfaces/event';
import { EmitHistoryActions } from '../actions';

namespace Reducer {

  export interface EmitHistory {
    selectedTabId: string;
    events: IEvent[];
  }

  const initialState: EmitHistory = {
    selectedTabId: 'default',
    events: []
  };


  export function eventHistoryReducer(state: EmitHistory = initialState, action: EmitHistoryActions.All) {
    let newState: EmitHistory;
    switch (action.type) {
      case EmitHistoryActions.ADD:
        newState = cloneDeep(state);
        const event: IEvent = cloneDeep(action.payload);
        event.created = new Date();
        event.id = generate();
        if (isEmpty(event.tabId)) {
          event.tabId = initialState.selectedTabId;
        }
        newState.events.push(event);
        return newState;
      case EmitHistoryActions.REMOVE:
        newState = cloneDeep(state);
        newState.events = newState.events.filter(e => e.id !== this.payload.eventId);
        return newState;
      case EmitHistoryActions.SELECT_TAB:
        return {...state, selectedTabId: action.payload.tabId};
      case EmitHistoryActions.REMOVE_ALL:
        return {...initialState};
      default:
        return state;

    }
  }
}
export default Reducer;
