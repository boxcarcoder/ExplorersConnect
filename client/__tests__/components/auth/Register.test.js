import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component for testing. Importing Register will import the default, which is the connected component. { Register } is non-connected.
import { Register } from '../../../src/components/auth/Register';
// Props for the component
import { setAlert } from '../../../src/actions/alert';
import { register } from '../../../src/actions/auth';

describe('<Register /> component.', () => {
  let props;

  beforeEach(() => {
    props = {
      setAlert: setAlert,
      register: register,
      authState: {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: false,
        loggedInUser: null,
      },
    };
  });

  test('Successfully renders.', () => {
    const wrapper = shallow(<Register {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Unit tests.
  test('Text box for Name updates.', () => {
    // Grab the shallow component in a wrapper.
    const wrapper = shallow(<Register {...props} />);
    // console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));

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

  test('Text box for Email updates.', () => {
    // Grab the shallow component in a wrapper.
    const wrapper = shallow(<Register {...props} />);

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
    expect(wrapper.find('input').at(1).props().value).toEqual('test@test.com');
  });

  test('Text box for Password updates.', () => {
    // Grab the shallow component in a wrapper.
    const wrapper = shallow(<Register {...props} />);

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

  test('Text box for Confirm Password updates.', () => {
    // Grab the shallow component in a wrapper.
    const wrapper = shallow(<Register {...props} />);

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
