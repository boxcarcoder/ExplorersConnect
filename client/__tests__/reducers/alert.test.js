import alert from '../../src/reducers/alert';
import { SET_ALERT, REMOVE_ALERT } from '../../src/actions/types';
import uuid from 'uuid';
jest.mock('uuid/v4');

describe('Alert Reducer.', () => {
  test('The initial state is returned.', () => {
    // Create a test action to send to the reducer.
    let testAction = {};

    // Send the test action to the reducer. The reducer is called with an undefined state.
    const reducer = alert(undefined, testAction);

    // Execute the test.
    const initialState = [];
    expect(reducer).toEqual(initialState);
  });

  describe('Receive the SET_ALERT action.', () => {
    test('Returns the correct state.', () => {
      // Create a test action
      // Mock the uuid that's generated in the action.
      uuid.mockImplementation(() => 'testid');

      let testAction = {
        type: SET_ALERT,
        payload: {
          msg: 'test alert msg',
          alertType: 'test alert type',
          id: 'testid',
        },
      };

      // Send the test action to the reducer
      const reducer = alert(undefined, testAction);

      // Execute the test
      const expectedState = [
        {
          msg: 'test alert msg',
          alertType: 'test alert type',
          id: 'testid',
        },
      ];
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receive the REMOVE_ALERT action.', () => {
    test('Returns the correct state.', () => {
      // Create a test action
      // Mock the uuid that's generated in the action.
      uuid.mockImplementation(() => 'testid');

      let testAction = {
        type: REMOVE_ALERT,
        payload: 'testid',
      };

      // Send the test action to the reducer
      const reducer = alert(undefined, testAction);

      // Execute the test
      const expectedState = [];
      expect(reducer).toEqual(expectedState);
    });
  });
});
