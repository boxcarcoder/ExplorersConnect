import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

// profile: When the user logs in, or visits another user's profile page,
// an HTTP request will be made that returns the profile's data
// profiles: For the list of all profiles for the explorers page.
const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload, //the payload is the profile data returned from the GET request to the backend route /api/profiles/me
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
