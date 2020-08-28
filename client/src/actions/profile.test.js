import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as profileActions from './profile';

// Create mock store that returns payloads as promises made possible by thunk
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Profile Actions', () => {
  let store = mockStore();

  beforeEach(() => {
    // Clear any stored actions.
    store.clearActions();
  });

  describe('getCurrentProfile() action.', () => {
    test('dispatches GET_PROFILE', async () => {
      // Mock the response of the HTTP request.
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            profile: {
              user: {
                _id: 'test id',
              },
              bio: 'test bio',
              location: 'test location',
            },
          },
        })
      );

      // Dispatch the action.
      await store.dispatch(profileActions.getCurrentProfile());

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'GET_PROFILE',
          payload: {
            profile: {
              user: {
                _id: 'test id',
              },
              bio: 'test bio',
              location: 'test location',
            },
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });

    test('dipatches PROFILE_ERROR', async () => {
      // Mock the response of the HTTP request.
      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error getting current profile',
        })
      );

      // Dispatch the action.
      await store.dispatch(profileActions.getCurrentProfile());

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'PROFILE_ERROR',
          payload: {
            msg: {
              err: 'Error getting current profile',
            },
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });

  describe('getAllProfiles() action.', () => {
    test('dispatches GET_ALL_PROFILES', async () => {
      // Mock the response of the HTTP request
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: [
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
        })
      );

      // Dispatch the action
      await store.dispatch(profileActions.getAllProfiles());

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'GET_ALL_PROFILES',
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
        },
      ];
      expect(actions).toEqual(expectedActions);
    });

    test('dipatches PROFILE_ERROR', async () => {
      // Mock the response of the HTTP request.
      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error getting all profiles',
        })
      );

      // Dispatch the action.
      await store.dispatch(profileActions.getAllProfiles());

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'PROFILE_ERROR',
          payload: {
            msg: {
              err: 'Error getting all profiles',
            },
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });
});
