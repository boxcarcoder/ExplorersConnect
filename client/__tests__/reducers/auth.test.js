import auth from '../../src/reducers/auth';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../../src/actions/types';

describe('Auth Reducer.', () => {
  test('The initial state is returned.', () => {
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

  describe('Receive the the REGISTER_SUCCESS action.', () => {
    test('Returns the correct state.', () => {
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

  describe('Receive the the REGISTER_FAIL action.', () => {
    test('Returns the correct state.', () => {
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

  describe('Receive the the USER_LOADED action.', () => {
    test('Returns the correct state.', () => {
      // Create a test action.
      let testAction = {
        type: USER_LOADED,
        payload: {
          user: {
            name: 'test name',
            email: 'test@test.com',
            avatar: '',
            date: '',
          },
        },
      };

      // Send the test action to the reducer.
      const reducer = auth(undefined, testAction);

      // Execute the test.
      const expectedState = {
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        loading: false,
        loggedInUser: {
          user: {
            name: 'test name',
            email: 'test@test.com',
            avatar: '',
            date: '',
          },
        },
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receive the AUTH_ERROR action.', () => {
    test('Returns the correct state.', () => {
      // Create a test action.
      let testAction = {
        type: AUTH_ERROR,
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

  describe('Receive the LOGIN_SUCCESS action.', () => {
    test('Returns the correct state.', () => {
      // Create a test action.
      let testAction = {
        type: LOGIN_SUCCESS,
        payload: {
          token: 'test token',
        },
      };

      // Send the test action to the reducer.
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

  describe('Receive the LOGIN_FAIL action.', () => {
    test('Returns the correct state.', () => {
      // Create a test action.
      let testAction = {
        type: LOGIN_FAIL,
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

  describe('Receive the LOGOUT action.', () => {
    test('Returns the correct state.', () => {
      // Create a test action.
      let testAction = {
        type: LOGOUT,
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
