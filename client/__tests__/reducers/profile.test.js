import profile from '../../src/reducers/profile';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_ALL_PROFILES,
  GET_PROFILE_BY_ID,
} from '../../src/actions/types';

// Global variables for tests
let initialState = {};

describe('Profile reducer', () => {
  test('The initial state is returned.', () => {
    // Create a test action to send to the reducer.
    let testAction = {};

    // Send the test action to the reducer. The reducer is called with an undefined state.
    const reducer = profile(undefined, testAction);

    // Execute the test.
    initialState = {
      profile: null,
      profiles: [],
      loading: true,
      error: {},
    };
    expect(reducer).toEqual(initialState);
  });

  describe('Receives the GET_PROFILE action', () => {
    test('Returns the correct state.', () => {
      // Create a test action
      let testAction = {
        type: GET_PROFILE,
        payload: {
          user: {
            _id: 'test id',
          },
          bio: 'test bio',
          location: 'test location',
        },
      };

      // Send the test action to the reducer
      const reducer = profile(undefined, testAction);

      // Execute the test
      const expectedState = {
        profile: {
          user: {
            _id: 'test id',
          },
          bio: 'test bio',
          location: 'test location',
        },
        profiles: [],
        loading: false,
        error: {},
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receives the PROFILE_ERROR action', () => {
    test('Returns the correct state', () => {
      // Create a test action
      let testAction = {
        type: PROFILE_ERROR,
        payload: {
          msg: {
            err: 'Error from profile action.',
          },
        },
      };

      // Send the test action to the reducer
      const reducer = profile(undefined, testAction);

      // Execute the test
      const expectedState = {
        profile: null,
        profiles: [],
        loading: false,
        error: {
          msg: {
            err: 'Error from profile action.',
          },
        },
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receives the CREATE_PROFILE action', () => {
    test('Returns the correct state', () => {
      // Create a test action
      let testAction = {
        type: CREATE_PROFILE,
        payload: {
          user: {
            _id: 'test id',
          },
          bio: 'test bio',
          location: 'test location',
        },
      };

      // Send the test action to the reducer
      const reducer = profile(undefined, testAction);

      // Execute the test
      const expectedState = {
        profile: {
          user: {
            _id: 'test id',
          },
          bio: 'test bio',
          location: 'test location',
        },
        profiles: [],
        loading: false,
        error: {},
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receives the UPDATE_PROFILE action', () => {
    test('Returns the correct state.', () => {
      // Create a test action
      let testAction = {
        type: UPDATE_PROFILE,
        payload: {
          user: {
            _id: 'test id',
          },
          bio: 'test bio',
          location: 'test location',
          destinations: [
            {
              campSites: 'test camp site.',
            },
          ],
        },
      };

      // Send the test action to the reducer
      const reducer = profile(undefined, testAction);

      // Execute the test
      const expectedState = {
        profile: {
          user: {
            _id: 'test id',
          },
          bio: 'test bio',
          location: 'test location',
          destinations: [
            {
              campSites: 'test camp site.',
            },
          ],
        },
        profiles: [],
        loading: false,
        error: {},
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receives the CLEAR_PROFILE action', () => {
    test('Returns the correct state.', () => {
      // Create a test action
      let testAction = {
        type: CLEAR_PROFILE,
      };

      // Send the test action to the reducer
      const reducer = profile(undefined, testAction);

      // Execute the test
      const expectedState = {
        profile: null,
        profiles: [],
        loading: false,
        error: {},
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receives the GET_ALL_PROFILES action', () => {
    test('Returns the correct state', () => {
      // Create a test action
      let testAction = {
        type: GET_ALL_PROFILES,
        payload: [
          {
            user: {
              _id: 'test id',
            },
            bio: 'test bio',
            location: 'test location',
          },
          {
            user: {
              _id: 'test id2',
            },
            bio: 'test bio2',
            location: 'test location2',
          },
        ],
      };

      // Send the test action to the reducer
      const reducer = profile(undefined, testAction);

      // Execute the test
      const expectedState = {
        profile: null,
        profiles: [
          {
            user: {
              _id: 'test id',
            },
            bio: 'test bio',
            location: 'test location',
          },
          {
            user: {
              _id: 'test id2',
            },
            bio: 'test bio2',
            location: 'test location2',
          },
        ],
        loading: false,
        error: {},
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receives the GET_PROFILE_BY_ID action', () => {
    test('Returns the correct state.', () => {
      // Create the test action
      let testAction = {
        type: GET_PROFILE_BY_ID,
        payload: {
          user: {
            _id: 'test id',
          },
          bio: 'test bio',
          location: 'test location',
        },
      };

      // Send the test to reducer
      const reducer = profile(undefined, testAction);

      // Execute the test
      const expectedState = {
        profile: {
          user: {
            _id: 'test id',
          },
          bio: 'test bio',
          location: 'test location',
        },
        profiles: [],
        loading: false,
        error: {},
      };
      expect(reducer).toEqual(expectedState);
    });
  });
});
