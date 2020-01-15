import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from './types';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load User.
export const loadUser = () => async dispatch => {
  // set the token as the header if the token exists
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // our backend returns the user as the res when GET-ting from /api/auth
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User.
// Receives an object containing the name, email, and password.
export const register = ({ name, email, password }) => async dispatch => {
  // configuration of the HTTP request to the backend
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // convert the object into a JSON string
  const body = JSON.stringify({ name, email, password });

  try {
    // send the HTTP post request to the backend
    // our backend returns a token as the res when POSTing to api/users
    const res = await axios.post('/api/users', body, config);

    // dispatch action to reducer to modify state
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    // display errors as alerts using alert action and reducer
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    // dispatch action to reducer to modify state
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
