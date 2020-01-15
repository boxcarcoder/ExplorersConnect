import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'), //fetches a token from local storage and assigns it to the token state
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload //the payload is the user data from the backend from the GET request
      };

    case REGISTER_SUCCESS: // set the token into or remove from local storage
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case AUTH_ERROR:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null, //set the token state to null since it is removed from local storage
        isAuthenticated: false,
        loading: false
      };

    default:
      return state;
  }
}
