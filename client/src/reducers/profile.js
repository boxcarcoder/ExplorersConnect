import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  GET_ALL_PROFILES,
  GET_PROFILE_BY_ID
} from '../actions/types';

// profile: When the user logs in, or visits another user's profile page,
// an HTTP request will be made that returns the profile's data.
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
    case CREATE_PROFILE:
    case UPDATE_PROFILE:
    case GET_PROFILE_BY_ID:
      return {
        ...state,
        profile: payload, //the payload is the profile data returned from the backend
        loading: false
      };
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: payload, //the payload is the profiles data returned from the backend
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
}
