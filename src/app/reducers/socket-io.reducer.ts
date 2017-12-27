import * as SocketIoActions from '../actions/socket-io.actions';

export interface SocketIoState {
  connected: boolean;
  url?: string;
  socket?: SocketIOClient.Socket;
  connecting: boolean;
}

const initialState: SocketIoState = {
  connected: false,
  connecting: false
};


export function socketIoReducer(state = initialState, action: SocketIoActions.All) {
  switch (action.type) {
    case SocketIoActions.CONNECT:
      return {...state, connecting: true, connected: false, url: action.payload};

    case SocketIoActions.CONNECTED:
      return {...state, connecting: false, connected: true, socket: action.payload};


    case SocketIoActions.DISCONNECT:
      return {...initialState};

    default:
      return state;

  }
}
