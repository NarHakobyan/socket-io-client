import { ProgressBarActions } from '../actions';
import { set } from 'immutadot';

namespace Reducer {

  export interface ProgressBarState {
    show: boolean;
  }

  const initialState: ProgressBarState = {
    show: false
  };


  export function progressBarReducer(state: ProgressBarState = initialState, action: ProgressBarActions.All) {
    switch (action.type) {
      case ProgressBarActions.SHOW:
        return set(state, 'show', true);
      case ProgressBarActions.HIDE:
        return set(state, 'show', false);
      default:
        return state;

    }
  }
}
export default Reducer;
