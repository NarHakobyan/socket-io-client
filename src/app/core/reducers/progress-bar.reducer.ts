import { ProgressBarActions } from '../actions/index';

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
        return {...state, show: true};

      case ProgressBarActions.HIDE:
        return {...state, show: false};

      default:
        return state;

    }
  }
}
export default Reducer;
