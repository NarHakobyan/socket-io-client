import { ProgressBarReducer, SocketIoReducer } from 'app/reducers';

export interface AppState {
  progressBar: ProgressBarReducer.ProgressBarState;
  socketIo: SocketIoReducer.SocketIoState;
}

export const getProgressBarState = (state: AppState) => state.progressBar;
export const getSocketIoState = (state: AppState) => state.socketIo;
