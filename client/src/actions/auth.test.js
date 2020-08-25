import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as authActions from './auth';

// Create mock store that returns payloads as promises made possible by thunk
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Auth Actions', () => {
  let store = mockStore();

  beforeEach(() => {
    // Clear any stored actions.
    store.clearActions();
  });

  describe('loadUser() action.', () => {
    test('dispatches USER_LOADED.', async () => {
      // Mock the response of the action's Axios HTTP request.
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            name: 'test name',
            email: 'test@test.com',
            avatar: '',
            date: '',
          },
        })
      );

      // Dispatch the action into the mock store.
      // The action uses the mock Axios library so our server won't receive any HTTP requests.
      // As a result, our server won't send any response.
      // Instead, the response to the HTTP request is defined by the mockImplementationOnce().
      // This mock response is dispatched as the action's payload, along with the type: USER_LOADED.
      await store.dispatch(authActions.loadUser());

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'USER_LOADED',
          payload: {
            name: 'test name',
            email: 'test@test.com',
            avatar: '',
            date: '',
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });

    test('dispatches AUTH_ERROR.', async () => {
      // Mock the response of the action's Axios HTTP request.
      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({ err: 'Failed to load user.' })
      );

      // Dispatch the action into the mock store.
      // This action uses the mock Axios library.
      // The response received by our mock Axios HTTP request is defined by mockImplementationOnce().
      // In this case, we defined the response to be a promise rejection.
      await store.dispatch(authActions.loadUser());

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'AUTH_ERROR',
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });

  describe('register() action.', () => {
    test('dispatches REGISTER_SUCCESS.', async () => {
      // Mock the response of the action's HTTP request.
      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          token: 'test token',
        })
      );

      // Dispatch the action.b
      let testUser = {
        name: 'test name',
        email: 'test@test.com',
        password: 'testpw',
      };
      const { name, email, password } = testUser;
      await store.dispatch(authActions.register({ name, email, password }));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'REGISTER_SUCCESS',
        },
      ];
      expect(actions).toEqual(expectedActions);
    });

    test('dispatches REGISTER_FAIL.', async () => {
      // Mock the response of the action's HTTP request.
      mockAxios.post.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Failed to register user.',
        })
      );

      // Dispatch the action.
      let testUser = {
        name: 'test name',
        email: 'test@test.com',
        password: 'testpw',
      };
      const { name, email, password } = testUser;
      await store.dispatch(authActions.register({ name, email, password }));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'REGISTER_FAIL',
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });
});
