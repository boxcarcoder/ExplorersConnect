import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component for testing.
import { Login } from '../../../src/components/auth/Login';

// Props for the component.
import { login } from '../../../src/actions/auth';

//Globals for testing
let props;
let wrapper;

describe('<Login /> component.', () => {
  beforeEach(() => {
    props = {
      login: login,
      authState: {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: false,
        loggedInUser: null,
      },
    };

    // Grab the shallow component in a wrapper.
    wrapper = shallow(<Login {...props} />);
  });

  test('Succesfully renders.', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('Text box updates for', () => {
    test('Email.', () => {
      // Find the input within the component
      wrapper
        .find('input')
        .at(0)
        .simulate('change', {
          target: {
            value: 'test@test.com',
          },
        });

      // Execute the test
      expect(wrapper.find('input').at(0).props().value).toBe('test@test.com');
    });

    test('Password.', () => {
      // Find the input within the component
      wrapper
        .find('input')
        .at(1)
        .simulate('change', {
          target: {
            value: 'testpw',
          },
        });

      // Execute the test
      expect(wrapper.find('input').at(1).props().value).toBe('testpw');
    });
  });

  test('When the form is submitted, the default event is cancelled.', () => {
    // Find the form within the component to test it.
    let eventPrevented = false;
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {
        eventPrevented = true;
      },
    });
    // Execute the test.
    expect(eventPrevented).toBe(true);
  });

  test('Includes link to Register page.', () => {
    // Find the input within the component to test it.
    const link = wrapper.find('Link');

    // Execute the test
    expect(link.props().to).toBe('/register');
  });
});
