import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component for testing.
// Importing Register will import the default, which is the connected component. { Register } is non-connected.
import { Register } from '../../../src/components/auth/Register';

// Globals for test
let props;
let wrapper;

describe('<Register /> component.', () => {
  beforeEach(() => {
    props = {
      setAlert: jest.fn(),
      register: jest.fn(),
      authState: {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: false,
        loggedInUser: null,
      },
    };

    // Grab the shallow component in a wrapper.
    wrapper = shallow(<Register {...props} />);
  });

  test('Successfully renders.', () => {
    expect(wrapper.exists()).toBe(true);
  });

  // Unit tests.

  describe('Text box is updated for', () => {
    test('Name.', () => {
      // Find the input within the component to test it.
      wrapper
        .find('input')
        .at(0)
        .simulate('change', {
          target: {
            value: 'test name',
          },
        });

      // Execute the test
      expect(wrapper.find('input').at(0).props().value).toEqual('test name');
    });

    test('Email.', () => {
      // Find the input within the component to test it.
      wrapper
        .find('input')
        .at(1)
        .simulate('change', {
          target: {
            value: 'test@test.com',
          },
        });

      // Execute the test
      expect(wrapper.find('input').at(1).props().value).toEqual(
        'test@test.com'
      );
    });

    test('Password.', () => {
      // Find the input within the component to test it.
      wrapper
        .find('input')
        .at(2)
        .simulate('change', {
          target: {
            value: 'testpassword',
          },
        });

      // Execute the test
      expect(wrapper.find('input').at(2).props().value).toEqual('testpassword');
    });

    test('Confirm Password.', () => {
      // Find the input within the component to test it.
      wrapper
        .find('input')
        .at(3)
        .simulate('change', {
          target: {
            value: 'testpassword',
          },
        });

      // Execute the test
      expect(wrapper.find('input').at(3).props().value).toEqual('testpassword');
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

  test('Includes link to Login page.', () => {
    // Find the input within the component to test it.
    const link = wrapper.find('Link');

    // Execute the test
    expect(link.props().to).toBe('/login');
  });
});
