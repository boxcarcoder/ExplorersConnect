import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { loadUser } from './auth';

// Create mock store that returns payloads as promises (thunk) and dispatches action statuses (promiseMiddleware).
const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Auth Actions', () => {
  let store;

  // Initialize mock store before each test to prevent unexpected behavior.
  beforeEach(() => {
    store = mockStore({
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      loading: true,
      loggedInUser: null,
    });
  });

  describe('loadUser action creator', () => {
    test('dispatches USER_LOADED action and returns data on success', async () => {
      // Mock the response of the action.
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: [
            { name: 'test name', email: 'test@test.com', avatar: '', date: '' },
          ],
        })
      );

      // Execute the test.
      await store.dispatch(loadUser());
      const actions = store.getActions();

      expect.assertions(2);
      expect(actions[0].type).toEqual('USER_LOADED');
      expect(actions[0].payload.data[0].name).toEqual('test name');

      // expect(actions[1].type).toEqual('USER_LOADED_FULFILLED');
      // expect(actions[1].payload.data[0].name).toEqual('test name');
      // expect(actions[1].payload.data[0].email).toEqual('test@test.com');
    });
  });
});
