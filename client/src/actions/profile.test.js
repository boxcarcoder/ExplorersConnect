import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_ALL_PROFILES,
  GET_PROFILE_BY_ID,
  SET_ALERT,
} from './types';
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
          type: GET_PROFILE,
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
          type: PROFILE_ERROR,
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
          type: PROFILE_ERROR,
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
          type: GET_PROFILE_BY_ID,
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
          type: PROFILE_ERROR,
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
        profileActions.createProfile(testProfile, historyMock)
      );

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: CREATE_PROFILE,
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
          type: SET_ALERT,
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
        profileActions.createProfile(testProfile, historyMock)
      );

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: PROFILE_ERROR,
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

  describe('addDestinations() action.', () => {
    test('dispatch UPDATE_PROFILE', async () => {
      // Mock the response of the HTTP request
      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
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
          },
        })
      );

      // Dispatch the action
      const historyMock = { push: jest.fn() };
      let testDestinations = {
        hikingTrails: '',
        campSites: 'test camp site.',
        waterAreas: '',
        slopes: '',
        crags: '',
      };
      await store.dispatch(
        profileActions.addDestinations(testDestinations, historyMock)
      );

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: UPDATE_PROFILE,
          payload: {
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
          },
        },
      ];
      expect(actions[0]).toEqual(expectedActions[0]);
    });

    test('dispatch PROFILE_ERROR', async () => {
      // Mock the response of the HTTP request
      mockAxios.put.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error adding destination',
        })
      );

      // Dispatch the action
      const historyMock = { push: jest.fn() };
      let testDestinations = {
        hikingTrails: '',
        campSites: 'test camp site.',
        waterAreas: '',
        slopes: '',
        crags: '',
      };
      await store.dispatch(
        profileActions.addDestinations(testDestinations, historyMock)
      );

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: PROFILE_ERROR,
          payload: {
            msg: {
              err: 'Error adding destination',
            },
          },
        },
      ];
      expect(actions[0]).toEqual(expectedActions[0]);
    });
  });

  describe('addGears() action.', () => {
    test('dispatch UPDATE_PROFILE', async () => {
      // Mock the response of the HTTP request
      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            profile: {
              user: {
                _id: 'test id',
              },
              bio: 'test bio',
              location: 'test location',
              gears: [
                {
                  campGear: 'test camp gear.',
                },
              ],
            },
          },
        })
      );

      // Dispatch the action
      const historyMock = { push: jest.fn() };
      let testGears = {
        hikeGear: '',
        campGear: 'test camp gear.',
        waterGear: '',
        snowGear: '',
        rockClimbingGear: '',
      };
      await store.dispatch(profileActions.addGears(testGears, historyMock));

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: UPDATE_PROFILE,
          payload: {
            profile: {
              user: {
                _id: 'test id',
              },
              bio: 'test bio',
              location: 'test location',
              gears: [
                {
                  campGear: 'test camp gear.',
                },
              ],
            },
          },
        },
      ];
      expect(actions[0]).toEqual(expectedActions[0]);
    });

    test('dispatch PROFILE_ERROR', async () => {
      // Mock the response of the HTTP request
      mockAxios.put.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error in updating gears.',
        })
      );

      // Dispatch the action
      const historyMock = { push: jest.fn() };
      let testGears = {
        hikeGear: '',
        campGear: 'test camp gear.',
        waterGear: '',
        snowGear: '',
        rockClimbingGear: '',
      };
      await store.dispatch(profileActions.addGears(testGears, historyMock));

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: PROFILE_ERROR,
          payload: {
            msg: {
              err: 'Error in updating gears.',
            },
          },
        },
      ];
      expect(actions[0]).toEqual(expectedActions[0]);
    });
  });

  describe('deleteDestinations() action.', () => {
    test('dispatch UPDATE_PROFILE', async () => {
      // Mock the response of the HTTP request
      mockAxios.delete.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            profile: {
              user: {
                _id: 'test id',
              },
              bio: 'test bio',
              location: 'test location',
              destinations: [],
            },
          },
        })
      );

      // Dispatch the action
      let testId = 'testId';
      await store.dispatch(profileActions.deleteDestinations(testId));

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: UPDATE_PROFILE,
          payload: {
            profile: {
              user: {
                _id: 'test id',
              },
              bio: 'test bio',
              location: 'test location',
              destinations: [],
            },
          },
        },
      ];
      expect(actions[0]).toEqual(expectedActions[0]);
    });
    test('dispatch PROFILE_ERROR', async () => {
      // Mock the response of the HTTP request
      mockAxios.delete.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error deleting destinations.',
        })
      );

      // Dispatch the action
      let testId = 'testId';
      await store.dispatch(profileActions.deleteDestinations(testId));

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: PROFILE_ERROR,
          payload: {
            msg: {
              err: 'Error deleting destinations.',
            },
          },
        },
      ];
      expect(actions[0]).toEqual(expectedActions[0]);
    });
  });

  describe('deleteGears() action.', () => {
    test('dispatch UPDATE_PROFILE', async () => {
      // Mock the response of the HTTP request
      mockAxios.delete.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            profile: {
              user: {
                _id: 'test id',
              },
              bio: 'test bio',
              location: 'test location',
              gears: [],
            },
          },
        })
      );

      // Dispatch the action
      let testId = 'testId';
      await store.dispatch(profileActions.deleteGears(testId));

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: UPDATE_PROFILE,
          payload: {
            profile: {
              user: {
                _id: 'test id',
              },
              bio: 'test bio',
              location: 'test location',
              gears: [],
            },
          },
        },
      ];
      expect(actions[0]).toEqual(expectedActions[0]);
    });

    test('dispatch PROFILE_ERROR', async () => {
      // Mock the response of the HTTP request
      mockAxios.delete.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error deleting destinations.',
        })
      );

      // Dispatch the action
      let testId = 'testId';
      await store.dispatch(profileActions.deleteGears(testId));

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: PROFILE_ERROR,
          payload: {
            msg: {
              err: 'Error deleting destinations.',
            },
          },
        },
      ];
      expect(actions[0]).toEqual(expectedActions[0]);
    });
  });

  describe('deleteAccount() action.', () => {
    test('dispatch ACCOUNT_DELETED', async () => {
      // Mock the response of the HTTP request
      mockAxios.delete.mockImplementationOnce(() =>
        Promise.resolve({
          msg: 'User and their profile deleted.',
        })
      );

      // Dispatch the action
      // Mock the window.confirm required in the action
      let confirmSpy = jest.spyOn(window, 'confirm');
      confirmSpy.mockImplementation(jest.fn(() => true));

      // Mock the history.push performed in the action
      const historyMock = { push: jest.fn() };
      await store.dispatch(profileActions.deleteAccount(historyMock));

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: ACCOUNT_DELETED,
        },
        {
          type: CLEAR_PROFILE,
        },
      ];
      expect(actions[0]).toEqual(expectedActions[0]);
      confirmSpy.mockRestore();
    });

    test('dispatch CLEAR_PROFILE', async () => {
      // Mock the response of the HTTP request
      mockAxios.delete.mockImplementationOnce(() =>
        Promise.resolve({
          msg: 'User and their profile deleted.',
        })
      );

      // Dispatch the action
      // Mock the window.confirm required in the action
      let confirmSpy = jest.spyOn(window, 'confirm');
      confirmSpy.mockImplementation(jest.fn(() => true));

      // Mock the history.push performed in the action
      const historyMock = { push: jest.fn() };
      await store.dispatch(profileActions.deleteAccount(historyMock));

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: ACCOUNT_DELETED,
        },
        {
          type: CLEAR_PROFILE,
        },
      ];
      expect(actions[1]).toEqual(expectedActions[1]);
      confirmSpy.mockRestore();
    });

    test('dispatch PROFILE_ERROR', async () => {
      // Mock the response of the HTTP request
      mockAxios.delete.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error deleting account.',
        })
      );

      // Dispatch the action
      // Mock the window.confirm required in the action
      let confirmSpy = jest.spyOn(window, 'confirm');
      confirmSpy.mockImplementation(jest.fn(() => true));

      // Mock the history.push performed in the action
      const historyMock = { push: jest.fn() };
      await store.dispatch(profileActions.deleteAccount(historyMock));

      // Execute the test
      const actions = store.getActions();
      const expectedActions = [
        {
          type: PROFILE_ERROR,
          payload: {
            msg: {
              err: 'Error deleting account.',
            },
          },
        },
      ];
      expect(actions[0]).toEqual(expectedActions[0]);
      confirmSpy.mockRestore();
    });
  });
});
