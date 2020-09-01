import auth from './auth';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../actions/types';

describe('Auth Reducer.', () => {
  test('The initial state is returned.', async () => {
    // Create a test action to send to the reducer.
    let testAction = {};

    // Send the test action to the reducer. The reducer is called with an undefined state.
    const reducer = auth(undefined, testAction);

    // Execute the test.
    const initialState = {
      token: localStorage.getItem('token'), //fetches a token from local storage and assigns it to the token state
      isAuthenticated: null,
      loading: true,
      loggedInUser: null,
    };
    expect(reducer).toEqual(initialState);
  });

  describe('Handle receiving the REGISTER_SUCCESS action.', () => {
    test('Returns the correct state.', async () => {
      // Create a test action to send to the reducer.
      let testAction = {
        type: REGISTER_SUCCESS,
        payload: {
          token: 'test token',
        },
      };

      // Send the test action to the reducer. The reducer is called with an undefined state.
      const reducer = auth(undefined, testAction);

      // Execute the test.
      const expectedState = {
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        loading: false,
        loggedInUser: null,
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Handle receiving the REGISTER_FAIL action.', () => {
    test('Returns the correct state.', async () => {
      // Create a test action to send to the reducer
      let testAction = {
        type: REGISTER_FAIL,
      };

      // Send the test action to the reducer.
      const reducer = auth(undefined, testAction);

      // Execute the test.
      const expectedState = {
        token: null,
        isAuthenticated: false,
        loading: false,
        loggedInUser: null,
      };
      expect(reducer).toEqual(expectedState);
    });
  });
});
