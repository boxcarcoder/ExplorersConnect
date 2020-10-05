import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { Landing } from '../../../src/components/layout/Landing';

// Globals for tests
let wrapper;
let props;

describe('<Landing /> component.', () => {
  test('Successfully renders', () => {
    props = {
      authState: {
        isAuthenticated: false,
      },
    };

    wrapper = shallow(<Landing {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Includes a link to', () => {
    beforeEach(() => {
      props = {
        authState: {
          isAuthenticated: false,
        },
      };

      wrapper = shallow(<Landing {...props} />);
    });

    test('the Register page.', () => {
      const link = wrapper.find('Link').at(0);
      expect(link.props().to).toBe('/register');
    });

    test('the Login page.', () => {
      const link = wrapper.find('Link').at(1);
      expect(link.props().to).toBe('/login');
    });

    test('a hyperlink credit for the landing page background.', () => {
      const a = wrapper.find('a');
      expect(a.props().href).toBe(
        'https://unsplash.com/@wanderingteddybear?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge'
      );
    });
  });

  describe('If the user is authenticated,', () => {
    beforeEach(() => {
      props = {
        authState: {
          isAuthenticated: true,
        },
      };

      wrapper = shallow(<Landing {...props} />);
    });
    test('render a redirect to the dashboard.', () => {
      const redirect = wrapper.find('Redirect');
      expect(redirect.props().to).toBe('/dashboard');
    });
  });
});
