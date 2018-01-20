import { SocketAppActions } from '@actions';
import { set } from 'immutadot';

namespace Reducer {

  export interface SocketApp {
    connectUrl: string;
  }

  const initialState: SocketApp = {
    connectUrl: 'http://localhost:8080'
  };


  export function socketAppReducer(state: SocketApp = initialState, action: SocketAppActions.All) {
    switch (action.type) {
      case SocketAppActions.SET_CONNECT_URL:
        return set(state, 'connectUrl', action.payload.connectUrl);
      case SocketAppActions.REMOVE_CONNECT_URL:
        return set(state, 'connectUrl', '');
      default:
        return state;

    }
  }
}
export default Reducer;
