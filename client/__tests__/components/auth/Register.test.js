import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
// import configureMockStore from 'redux-mock-store';
// import { Provider } from 'react-redux'; // needed to render a component that connects to a redux store

// Import the non-connected component for testing. Importing Register will import the default, which is the connected component. { Register } is non-connected.
import { Register } from '../../../src/components/auth/Register';
// Props for the component
import { setAlert } from '../../../src/actions/alert';
import { register } from '../../../src/actions/auth';

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

  test('Attempt #1', () => {
    const wrapper = shallow(<Register {...props} />);
    expect(wrapper.length).toBe(1);
    console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
    const section = wrapper.find('section');
    expect(section.length).toBe(1);
  });
});

// const mockStore = configureMockStore();

// // // Mock store Attempt #1
// const initialState = {
//   // setAlert: setAlert,
//   // register: register,
//   // authState: {
//   //   token: localStorage.getItem('token'),
//   //   isAuthenticated: false,
//   //   loading: false,
//   //   loggedInUser: null,
//   // },
// };
// let store = mockStore(initialState);

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
// let initialState = {
//   token: localStorage.getItem('token'),
//   isAuthenticated: false,
//   loading: false,
//   loggedInUser: null,
// };
// let store = mockStore(initialState);

// test("Attempt #1: No dive() and .find('section')", () => {
//   const wrapper = shallow(
//     <Provider store={store}>
//       <Register {...props} />
//     </Provider>
//   );
//   expect(wrapper.length).toBe(1);
//   // console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
//   const section = wrapper.find('section');
//   expect(section.length).toBe(1);
// });

// test("Attempt #2: Use dive() and .find('section')", () => {
//   const wrapper = shallow(
//     <Provider store={store}>
//       <Register {...props} />
//     </Provider>
//   ).dive();
//   expect(wrapper.length).toBe(1);
//   // console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
//   const section = wrapper.find('section');
//   expect(section.length).toBe(1);
// });

// test("Attempt #3: No dive() and .hasClass('container')", () => {
//   const wrapper = shallow(
//     <Provider store={store}>
//       <Register {...props} />
//     </Provider>
//   );
//   expect(wrapper.length).toBe(1);
//   // console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
//   expect(wrapper.hasClass('container')).toEqual(true);
// });

// test("Attempt #4: Use dive() and .hasClass('container')", () => {
//   const wrapper = shallow(
//     <Provider store={store}>
//       <Register {...props} />
//     </Provider>
//   ).dive();
//   expect(wrapper.length).toBe(1);
//   // console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
//   expect(wrapper.hasClass('container')).toEqual(true);
// });

// test('Attempt #5: No dive() and .to.have.lengthOf(1)', () => {
//   const wrapper = shallow(
//     <Provider store={store}>
//       <Register {...props} />
//     </Provider>
//   );
//   expect(wrapper.length).toBe(1);
//   // console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
//   expect(wrapper.find('.container')).to.have.lengthOf(1);
// });

// test('Attempt #6: Use dive() and .to.have.lengthOf(1)', () => {
//   const wrapper = shallow(
//     <Provider store={store}>
//       <Register {...props} />
//     </Provider>
//   ).dive();
//   expect(wrapper.length).toBe(1);
//   // console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
//   expect(wrapper.find('.container')).to.have.lengthOf(1);
// });

// test("Attempt #7: Use dive() and .find('section') and no <Provider>", () => {
//   const wrapper = shallow(<Register {...props} />).dive();
//   expect(wrapper.length).toBe(1);
//   // console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
//   const section = wrapper.find('section');
//   expect(section.length).toBe(1);
// });

// test("Attempt #9: Use dive() x2 and .find('section')", () => {
//   let wrapper = shallow(
//     <Provider store={store}>
//       <Register {...props} />
//     </Provider>
//   ).dive();
//   console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));
//   wrapper = wrapper.dive();
//   console.log('2 wrapper.debug(): ', wrapper.debug({ verbose: true }));

//   const section = wrapper.find('section');
//   expect(section.length).toBe(1);
// });

// test("Attempt #10: Use mount, no props + mock store #2, and .find('section')", () => {
//   let wrapper = mount(
//     <Provider store={store}>
//       <Register />
//     </Provider>
//   );
//   console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));

//   const section = wrapper.find('section');
//   expect(section.length).toBe(1);
// });

// test("Attempt #11: Use mount, no props + mock store #3, and .find('section')", () => {
//   let wrapper = mount(
//     <Provider store={store}>
//       <Register />
//     </Provider>
//   );
//   console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));

//   const section = wrapper.find('section');
//   expect(section.length).toBe(1);
// });

// test("Attempt #12: Use mount, no props + mock store #1, and .find('section')", () => {
//   let wrapper = mount(
//     <Provider store={store}>
//       <Register />
//     </Provider>
//   );
//   console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));

//   const section = wrapper.find('section');
//   expect(section.length).toBe(1);
// });

// test("Attempt #13: Use mount, explicit props, and .find('section')", () => {
//   let wrapper = mount(
//     <Provider store={store}>
//       <Register {...props} />
//     </Provider>
//   );
//   console.log('wrapper.debug(): ', wrapper.debug({ verbose: true }));

//   const section = wrapper.find('section');
//   expect(section.length).toBe(1);
// });
