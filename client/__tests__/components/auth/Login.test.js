import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component for testing.
import { Login } from '../../../src/components/auth/Login';

//Globals for testing
let props;
let wrapper;

describe('<Login /> component.', () => {
  beforeEach(() => {
    props = {
      login: jest.fn(),
      authState: {
        isAuthenticated: false,
      },
    };

    // Grab the shallow component in a wrapper.
    wrapper = shallow(<Login {...props} />);
  });

  test('Successfully renders.', () => {
    // Create snapshot of the DOM render.
    expect(wrapper).toMatchSnapshot();
  });

  test('Includes link to Register page.', () => {
    // Find the link within the component to test it.
    const link = wrapper.find('Link');

    // Execute the test
    expect(link.props().to).toBe('/register');
  });

  describe('Text updates for', () => {
    test('Email input box.', () => {
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

    test('Password input box.', () => {
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

  test('Renders Redirect to dashboard when user is authenticated.', () => {
    props = {
      login: jest.fn(),
      authState: {
        isAuthenticated: true,
      },
    };

    wrapper = shallow(<Login {...props} />);

    // Execute the test.
    const redirect = wrapper.find('Redirect');
    expect(redirect.props().to).toBe('/dashboard');
  });
});
