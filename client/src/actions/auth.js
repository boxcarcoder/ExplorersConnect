import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Load User.
export const loadUser = () => dispatch => {};

// Register User.
// Receives an object containing the name, email, and password
// in an HTTP Request.
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
