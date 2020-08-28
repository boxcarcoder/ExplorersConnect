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

  describe('getProfileById() action.', () => {
    test('dispatches GET_PROFILE_BY_ID', async () => {
      // Mock the response of the HTTP request
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

      // Dispatch the action
      let testId = 'testId';
      await store.dispatch(profileActions.getProfileById(testId));

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'GET_PROFILE_BY_ID',
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

    test('dispatches PROFILE_ERROR', async () => {
      // Mock the response of the HTTP request
      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error fetching profile by id',
        })
      );

      // Dispatch the action
      let testId = 'testId';
      await store.dispatch(profileActions.getProfileById(testId));

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'PROFILE_ERROR',
          payload: {
            msg: {
              err: 'Error fetching profile by id',
            },
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });

  describe('createProfile() action', () => {
    test('dispatches CREATE_PROFILE', async () => {
      // Mock the response of the HTTP request
      mockAxios.post.mockImplementationOnce(() =>
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

      // Dispatch the action
      const historyMock = { push: jest.fn() };
      let testProfile = {
        user: {
          _id: 'test id',
        },
        bio: 'test bio',
        location: 'test location',
      };
      await store.dispatch(
        profileActions.createProfile(testProfile, historyMock, false)
      );

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'CREATE_PROFILE',
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
        {
          type: 'SET_ALERT',
          payload: {
            msg: 'test alert msg',
            alertType: 'test alert type',
            id: 'testid',
          },
        },
      ];
      expect(actions[0]).toEqual(expectedActions[0]);
    });

    test('dispatches PROFILE_ERROR', async () => {
      // Mock the response of the HTTP request
      mockAxios.post.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error creating profile.',
        })
      );

      // Dispatch the action
      const historyMock = { push: jest.fn() };
      let testProfile = {
        user: {
          _id: 'test id',
        },
        bio: 'test bio',
        location: 'test location',
      };
      await store.dispatch(
        profileActions.createProfile(testProfile, historyMock, false)
      );

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'PROFILE_ERROR',
          payload: {
            msg: {
              err: 'Error creating profile.',
            },
          },
        },
      ];
      expect(actions[0]).toEqual(expectedActions[0]);
    });
  });
});
