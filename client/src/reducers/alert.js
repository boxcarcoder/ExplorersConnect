import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

// the reducer takes in a state and an action
export default function(state = initialState, action) {
  const { actionType, payload } = action;

  // add/remove the action from the state
  switch (actionType) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
