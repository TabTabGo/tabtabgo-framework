import * as ActionTypes from './actionTypes';

export default function ajaxStatusReducer(state = 0, action: any) {
  switch (action.type) {
    case ActionTypes.AJAX_CALL_BEGIN:
      return state + 1;
    case ActionTypes.AJAX_CALL_END:
    case ActionTypes.AJAX_CALL_ERROR:
      return state - 1;
    default:
      return state;
  }
}
