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

  describe('Renders', () => {
    test('link to the landing page.', () => {
      props = {
        logout: mockLogout,
        authState: {
          isAuthenticated: false,
        },
        setAlert: mockSetAlert,
      };

      wrapper = shallow(<Navbar {...props} />);

      // Execute the test.
      const link = wrapper.find('Link').at(0);
      expect(link.props().to).toBe('/');
    });

    test('a link to the Profiles page.', () => {
      const link = wrapper.find('Link').at(1);
      expect(link.props().to).toBe('/profiles');
    });

    test('a link to the Posts page.', () => {
      const link = wrapper.find('Link').at(2);
      expect(link.props().to).toBe('/posts');
    });
  });

  describe('If the user is authenticated, render', () => {
    beforeEach(() => {
      props = {
        logout: mockLogout,
        authState: {
          isAuthenticated: true,
        },
        setAlert: mockSetAlert,
      };

      wrapper = shallow(<Navbar {...props} />);
    });

    test('a hyperlink that triggers the logout() action and setAlert() action when clicked.', () => {
      // logout()
      const logoutLink = wrapper.find('a');
      logoutLink.simulate('click');
      expect(mockLogout).toHaveBeenCalled();

      // setAlert()
      expect(mockSetAlert).toHaveBeenCalled();
    });
  });
});
