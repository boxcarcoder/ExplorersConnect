import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load User.
// Sends an HTTP request to the backend to access an authenticated user's profile.
// Dispatches the user data returned from fetching into a redux state.
export const loadUser = () => async (dispatch) => {
  // set the token as the header if the token exists
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // our backend returns the user as the res when fetching from /api/auth
    const res = await axios.get('/api/auth');

    // dispatch user data to reducer to save the user data into a redux state
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log('ERROR FROM AUTH ACTION:', err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User.
// Sends an HTTP request to the backend to register the user.
// Dispatches the token returned from registering into a redux state.
export const register = ({ name, email, password }) => async (dispatch) => {
  // configuration of the HTTP request to the backend
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // convert the object into a JSON string
  const body = JSON.stringify({ name, email, password });

  try {
    // our backend returns a token as the res when POSTing to api/users
    const res = await axios.post('/api/users', body, config);

    // dispatch the token to reducer to save the token into a redux state
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    // display errors as alerts using alert action and reducer
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    // }
    console.log('err in auth action: ', err);
    // dispatch action to reducer to remove incorrect token from the redux state
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User.
// Sends an HTTP request to the backend to log in the user.
// Dispatches the token returned from logging in into a redux state.
export const login = ({ email, password }) => async (dispatch) => {
  // configuration of the HTTP request to the backend
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // convert the object into a JSON string
  const body = JSON.stringify({ email, password });

  try {
    // our backend returns a token as the res when POSTing to api/auth
    const res = await axios.post('/api/auth', body, config);

    // dispatch the token to reducer to save the token into a redux state
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    // display errors as alerts using alert action and reducer
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    // dispatch action to reducer to remove incorrect token from the redux state
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout user and clear profile
export const logout = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};
