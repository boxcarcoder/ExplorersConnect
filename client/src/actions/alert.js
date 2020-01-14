import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// dispatch from thunk middleware
// the setAlert action will dispatch to the reducer
// an action consists of a type and may consist of a payload too
export const setAlert = (msg, alertType) => dispatch => {
  let id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
};
