import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store'; // Smart components
import { Provider } from 'react-redux'; // needed to render a store that connects to a redux store

// Component to be tested
import Register from '../../../src/components/auth/Register';

const mockStore = configureMockStore();
const store = mockStore({});

describe('<Register />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(
        <Provider store={store}>
          <Register />
        </Provider>
      );
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
