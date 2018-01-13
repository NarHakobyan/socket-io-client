import { EmitterActions } from '../actions';
import { map, clone } from 'lodash';

namespace Reducer {

  export interface IContent {
    tabIndex?: number;
    name?: string;
    body?: object;
  }

  export interface Emitter {
    contents: IContent[];
  }

  const initialState: Emitter = {
    contents: [{name: '', body: {}}]
  };


  export function emitterReducer(state: Emitter = initialState, action: EmitterActions.All) {
    let contents;
    switch (action.type) {
      case EmitterActions.CHANGE_EMIT_NAME:
        if (action.payload.tabIndex + 1 > state.contents.length) {
          return {...state, contents: [...state.contents, {name: action.payload.name, body: {}, tabIndex: action.payload.tabIndex}]};
        }
        contents = map(state.contents, content => {
          if (content.tabIndex === action.payload.tabIndex) {
            const newData = clone(content);
            newData.name = action.payload.name;
            return newData;
          }
          return content;
        });
        return {...state, contents};
      case EmitterActions.CHANGE_EMIT_BODY:
        if (action.payload.tabIndex + 1 > state.contents.length) {
          return {...state, contents: [...state.contents, {name: '', body: action.payload.body, tabIndex: action.payload.tabIndex}]};
        }
        contents = map(state.contents, content => {
          if (content.tabIndex === action.payload.tabIndex) {
            const newData = clone(content);
            newData.body = action.payload.body;
            return newData;
          }
          return content;
        });
        return {...state, contents};
      default:
        return state;

    }
  }
}
export default Reducer;
