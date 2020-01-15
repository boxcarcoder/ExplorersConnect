import axios from 'axios';

// The token passed in will be from local storage.
// If there is a token from local storage, set the
// global header, x-auth-token, to the token. If not,
// delete whatever's in  the global header.
const setAuthToken = token => {
  if (token) {
    // set the global header
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
