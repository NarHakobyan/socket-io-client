import { ProgressBarReducer, SocketIoReducer } from 'app/reducers';

export interface AppState {
  progressBar: ProgressBarReducer.ProgressBarState;
  socketIo: SocketIoReducer.SocketIoState;
}
