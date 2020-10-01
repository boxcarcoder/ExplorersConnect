import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { Alert } from '../../../src/components/layout/Alert';

// Globals for tests
let wrapper;
let props;

describe('<Alert /> component.', () => {
  beforeEach(() => {
    props = {
      alertsState: [],
    };

    wrapper = shallow(<Alert {...props} />);
  });

  describe('Successfully renders', () => {
    test('with no alerts in alertsState.', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('with alerts in alertsState.', () => {
      // Create an alert for the alertsState.
      props = {
        alertsState: [
          {
            msg: 'test alert msg',
            alertType: 'test alert type',
            id: 'testid',
          },
          {
            msg: 'test alert msg2',
            alertType: 'test alert type',
            id: 'testid2',
          },
        ],
      };

      // Execute the test
      wrapper = shallow(<Alert {...props} />);

      let alert1Div = wrapper.find('div').at(0);
      expect(alert1Div.exists()).toBe(true);

      let alert2Div = wrapper.find('div').at(1);
      expect(alert2Div.exists()).toBe(true);
    });
  });
});
