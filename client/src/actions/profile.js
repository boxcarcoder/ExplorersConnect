import { GET_PROFILE, PROFILE_ERROR, CREATE_PROFILE } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

// Get the current user's profile.
export const getCurrentProfile = () => async dispatch => {
  try {
    //set the token as the header to gain access to the protected route /api/profiles/me
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // the backend returns the profile of the logged in user
    const res = await axios.get('/api/profiles/me');

    // dispatch profile data to reducer to save the profile data into the profile redux state
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.log('ERROR FROM PROFILE ACTION:', err);
    // dispatch error message and HTTP error status to the profile redux state
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile.
// The history object has the push method to redirect.
// Actions use push to redirect as opposed to using <Redirect />
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  // set the token as the header to gain access to the protected route /api/profiles/me
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  // configuration of the HTTP request to the backend
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    // the backend returns the created or updated profile
    const res = await axios.post('/api/profiles', formData, config);

    // dispatch the profile data to the reducer to save it into the profile redux state
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data
    });

    // display an alert to notify the user of what they just did
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    // if the user created, not updated a profile, redirect to the dashboard page after their profile is created.
    // redirecting in actions must use history.push from the component's withRouter import
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    // display errors such as missing bio or location
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
