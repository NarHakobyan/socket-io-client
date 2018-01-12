import { EmitterActions } from '../actions';
import { map } from 'lodash';

namespace Reducer {

  export interface EmitName {
    tabIndex: number;
    name: string;
  }

  export interface EmitBody {
    tabIndex: number;
    body: object;
  }

  export interface Emitter {
    names: EmitName[];
    bodies: EmitBody[];
  }

  const initialState: Emitter = {
    names: [{name: '', tabIndex: 0}],
    bodies: [{body: {}, tabIndex: 0}]
  };


  export function emitterReducer(state: Emitter = initialState, action: EmitterActions.All) {
    switch (action.type) {
      case EmitterActions.CHANGE_EMIT_NAME:

        const names = map(state.names, data => {
          if (data.tabIndex === action.payload.tabIndex) {
            data.name = action.payload.name;
          }
          return data;
        });
        return {...state, names};
      case EmitterActions.CHANGE_EMIT_BODY:
        const bodies = map(state.bodies, data => {
          if (data.tabIndex === action.payload.tabIndex) {
            data.body = action.payload.body;
          }
          return data;
        });
        return {...state, bodies};
      default:
        return state;

    }
  }
}
export default Reducer;
