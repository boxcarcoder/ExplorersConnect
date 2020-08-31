import {
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_ALL_PROFILES,
  GET_PROFILE_BY_ID,
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

// Get the current user's profile.
export const getCurrentProfile = () => async (dispatch) => {
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
      payload: res.data,
    });
  } catch (err) {
    // dispatch error message and HTTP error status to the profile redux state
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

// Get all users' profiles.
export const getAllProfiles = () => async (dispatch) => {
  try {
    // the backend returns all profiles
    const res = await axios.get('/api/profiles/');

    // dispatch profile data to reducer to save the profile data into the profile redux state
    dispatch({
      type: GET_ALL_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    // dispatch error message and HTTP error status to the profile redux state
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

// Get profile by ID
export const getProfileById = (id) => async (dispatch) => {
  try {
    // the backend returns the profile with that user id
    const res = await axios.get(`/api/profiles/user/${id}`);

    dispatch({
      type: GET_PROFILE_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    // dispatch error message and HTTP error status to the profile redux state
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

// Create or update profile.
export const createProfile = (
  formData,
  history, // The history object has the push method to redirect. Actions use push to redirect as opposed to using <Redirect />
  edit = false
) => async (dispatch) => {
  // set the token as the header to gain access to the protected route /api/profiles/me
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  // configuration of the HTTP request to the backend
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // the backend returns the created or updated profile
    const res = await axios.post('/api/profiles', formData, config);

    // dispatch the profile data to the reducer to save it into the profile redux state
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });

    // display an alert to notify the user of what they just did
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    // if the user created, not updated a profile, redirect to the dashboard page after their profile is created.
    // redirecting in actions must use history.push from the component's withRouter import
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

// Add Favorite Destinations to Profile
export const addDestinations = (formData, history) => async (dispatch) => {
  // set the token as the header to gain access to the protected route /api/profiles/destinatons
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  // configuration of the HTTP request to the backend
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // the backend returns the profile data with favorite destinations
    const res = await axios.put('/api/profiles/destinations', formData, config);

    // dispatch the profile data to the reducer to save it into the profile redux state
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // display an alert to notify the user of what they just did
    dispatch(setAlert('Profile Updated With Favorite Destinations', 'success'));

    // redirecting in actions must use history.push from the component's withRouter import
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

// Add Favorite Gears to Profile
export const addGears = (formData, history) => async (dispatch) => {
  // set the token as the header to gain access to the protected route /api/profiles/gears
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  // configuration of the HTTP request to the backend
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // the backend returns the profile data with favorite gears
    const res = await axios.put('/api/profiles/gears', formData, config);

    // dispatch the profile data to the reducer to save it into the profile redux state
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // display an alert to notify the user of what they just did
    dispatch(setAlert('Profile Updated With Favorite Gears', 'success'));

    // redirecting in actions must use history.push from the component's withRouter import
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

//Delete Destinations
export const deleteDestinations = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profiles/destinations/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Destinations removed.', 'success'));
  } catch (err) {
    console.log('err: ', err);

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

//Delete Gears
export const deleteGears = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profiles/gears/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Gears removed.', 'success'));
  } catch (err) {
    console.log('err: ', err);

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

//Delete Account and Profile
export const deleteAccount = (history) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone.')) {
    try {
      await axios.delete('/api/profiles/');

      //goes to auth reducer
      dispatch({
        type: ACCOUNT_DELETED,
      });

      //goes to profile reducer
      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch(setAlert('Your account and profile removed.'));
    } catch (err) {
      console.log('err: ', err);

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err },
      });
    }
  }
};
