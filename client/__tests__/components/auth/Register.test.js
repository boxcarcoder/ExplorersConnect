import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux'; // needed to render a component that connects to a redux store

// Component to be tested
import Register from '../../../src/components/auth/Register';
// Props for the component
import { setAlert } from '../../../src/actions/alert';
import { register } from '../../../src/actions/auth';

const mockStore = configureMockStore();
let initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  loggedInUser: null,
};
const store = mockStore(initialState);

describe('<Register /> component.', () => {
  let props;

  beforeEach(() => {
    props = {
      setAlert: setAlert,
      register2: register,
      authState: {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: false,
        loggedInUser: null,
      },
    };
  });

  // Unit tests
  test('Find the container rendered in the Register component.', () => {
    // Attempt #5
    const wrapper = mount(
      <Provider store={store}>
        <Register {...props} />
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.debug();
    expect(wrapper.find('.container')).to.have.lengthOf(1);

    // Attempt #4
    const wrapper = shallow(
      <Provider store={store}>
        <Register {...props} />
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.debug();
    expect(wrapper.find('.container')).to.have.lengthOf(1);

    // Attempt #3
    const wrapper = shallow(
      <Provider store={store}>
        <Register {...props} />
      </Provider>
    ).dive();
    expect(wrapper.length).toBe(1);
    wrapper.debug();
    expect(wrapper.hasClass('container')).toEqual(true);

    // Attempt #2
    const wrapper = shallow(
      <Provider store={store}>
        <Register {...props} />
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.debug();
    expect(wrapper.hasClass('container')).toEqual(true);

    // Attempt #1
    const wrapper = shallow(
      <Provider store={store}>
        <Register {...props} />
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.debug();
    const container = wrapper.find('.container');
    expect(container.length).toBe(1);
  });
});
