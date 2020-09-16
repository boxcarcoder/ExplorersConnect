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

// // Mock store Attempt #1
// let store = mockStore({
//   setAlert: setAlert,
//   register: register,
//   authState: {
//     token: localStorage.getItem('token'),
//     isAuthenticated: false,
//     loading: false,
//     loggedInUser: null,
//   },
// });

// // Mock Store Attempt #2
// let store = mockStore({
//   authState: {
//     token: localStorage.getItem('token'),
//     isAuthenticated: false,
//     loading: false,
//     loggedInUser: null,
//   },
// });

// // Mock Store Attempt #3
let initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  loggedInUser: null,
};
let store = mockStore(initialState);

describe('<Register /> component renders a <section> with className container.', () => {
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

  test("Attempt #1: No dive() and .find('section')", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Register {...props} />
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
    const section = wrapper.find('section');
    expect(section.length).toBe(1);
  });

  test("Attempt #2: Use dive() and .find('section')", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Register {...props} />
      </Provider>
    ).dive();
    expect(wrapper.length).toBe(1);
    console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
    const section = wrapper.find('section');
    expect(section.length).toBe(1);
  });

  test("Attempt #3: No dive() and .hasClass('container')", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Register {...props} />
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
    expect(wrapper.hasClass('container')).toEqual(true);
  });

  test("Attempt #4: Use dive() and .hasClass('container')", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Register {...props} />
      </Provider>
    ).dive();
    expect(wrapper.length).toBe(1);
    console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
    expect(wrapper.hasClass('container')).toEqual(true);
  });

  test('Attempt #5: No dive() and .to.have.lengthOf(1)', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Register {...props} />
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
    expect(wrapper.find('.container')).to.have.lengthOf(1);
  });

  test('Attempt #6: Use dive() and .to.have.lengthOf(1)', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Register {...props} />
      </Provider>
    ).dive();
    expect(wrapper.length).toBe(1);
    console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
    expect(wrapper.find('.container')).to.have.lengthOf(1);
  });
});
