import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// dispatch from thunk middleware.

// The setAlert action takes a message and alert type.
// Generates an id, and dispatches the message, alert type, and id to the reducer.
export const setAlert = (msg, alertType) => dispatch => {
  let id = uuid.v4();

  // the action
  dispatch({
    actionType: SET_ALERT,
    payload: { msg, alertType, id }
  });
};
