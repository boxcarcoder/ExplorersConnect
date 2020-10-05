import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { Navbar } from '../../../src/components/layout/Navbar';

// Globals for tests
let wrapper;
let props;
let mockLogout = jest.fn();
let mockSetAlert = jest.fn();

describe('<Navbar /> component.', () => {
  test('Successfully renders.', () => {
    props = {
      logout: mockLogout,
      authState: {
        isAuthenticated: true,
      },
      setAlert: mockSetAlert,
    };

    wrapper = shallow(<Navbar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Renders link to the ');
});
