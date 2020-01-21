import { GET_PROFILE, PROFILE_ERROR } from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get the current user's profile.
//
export const getCurrentProfile = () => async dispatch => {
  try {
    // our backend returns the profile of the logged in user
    // as the res when fetching from /api/profile/me
    const res = await axios.get('/api/profiles/me');

    // dispatch profile data to reducer to save the profile data into the profile redux state
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.log('error:', err);
    // dispatch error message and HTTP error status to the profile redux state
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
