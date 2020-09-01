import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SET_ALERT, REMOVE_ALERT } from './types';
import * as alertActions from './alert';
import uuid from 'uuid';
jest.mock('uuid/v4');

// Create mock store that returns payloads as promises made possible by thunk
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('alert Actions', () => {
  let store = mockStore();

  beforeEach(() => {
    // Clear any stored actions.
    store.clearActions();
  });

  describe('setAlert() action', () => {
    test('dipatches SET_ALERT', async () => {
      //Mock the uuid that's generated in the action.
      uuid.mockImplementation(() => 'testid');

      // Dispatch the action.
      await store.dispatch(
        alertActions.setAlert('test alert msg', 'test alert type')
      );

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: SET_ALERT,
          payload: {
            msg: 'test alert msg',
            alertType: 'test alert type',
            id: 'testid',
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });

    test('dispatches REMOVE_ALERT', async () => {
      //Mock the uuid that's generated in the action.
      uuid.mockImplementation(() => 'testid');

      // Mock the action's timer
      jest.useFakeTimers();

      // Dispatch the action.
      await store.dispatch(
        alertActions.setAlert('test alert msg', 'test alert type')
      );
      jest.runAllTimers();

      const actions = store.getActions();
      const expectedActions = [
        {
          type: REMOVE_ALERT,
          payload: 'testid',
        },
      ];
      expect(actions[1]).toEqual(expectedActions[0]);
    });
  });
});
