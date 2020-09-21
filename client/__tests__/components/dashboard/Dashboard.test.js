import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { Dashboard } from '../../../src/components/dashboard/Dashboard';

// Globals for tests
let props;
let wrapper;

describe('<Dashboard /> component.', () => {
  describe('Successfully renders', () => {
    test('a spinner while the loading property in the Profile state is true.', () => {
      // Set profile state to render a spinner.
      props = {
        getCurrentProfile: jest.fn(),
        profileState: {
          profile: null,
          profiles: [],
          loading: true,
          error: {},
        },
      };
      wrapper = shallow(<Dashboard {...props} />);

      // Execute the test
      expect(wrapper.exists()).toBe(true);
    });

    test('a prompt to create a profile if the profile property in the Profile state is empty.', () => {
      // Set profile state to render the prompt to create profile.
      props = {
        getCurrentProfile: jest.fn(),
        profileState: {
          profile: null,
          profiles: [],
          loading: false,
          error: {},
        },
      };
      wrapper = shallow(<Dashboard {...props} />);

      // Execute the test.
      expect(wrapper.exists()).toBe(true);
    });

    test('a Dashboard if the profile property in the Profile state is populated.', () => {
      // Set profile state to render the dashboard.
      props = {
        getCurrentProfile: jest.fn(),
        profileState: {
          profile: {
            user: {
              _id: 'test id',
            },
            bio: 'test bio',
            location: 'test location',
          },
          profiles: [],
          loading: false,
          error: {},
        },
      };
      wrapper = shallow(<Dashboard {...props} />);

      // Execute the test.
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('If a prompt to create a profile is rendered,', () => {
    test('it includes a link to create a profile.', () => {
      // Set profile state to render the prompt to create profile.
      props = {
        getCurrentProfile: jest.fn(),
        profileState: {
          profile: null,
          profiles: [],
          loading: false,
          error: {},
        },
      };
      wrapper = shallow(<Dashboard {...props} />);

      // Find the link within the component to test it.
      const link = wrapper.find('Link');

      // Execute the test.
      expect(link.props().to).toBe('/create-profile');
    });
  });

  describe('If a dashboard is rendered, ', () => {
    test('it wraps the <DashboardButtons /> component', () => {
      // Set profile state to render the dashboard.
      props = {
        getCurrentProfile: jest.fn(),
        profileState: {
          profile: {
            user: {
              _id: 'test id',
            },
            bio: 'test bio',
            location: 'test location',
          },
          profiles: [],
          loading: false,
          error: {},
        },
      };
      wrapper = shallow(<Dashboard {...props} />);

      // Execute the test.
      const DashboardButtonsChild = wrapper.find('DashboardButtons');
      expect(DashboardButtonsChild.exists()).toBe(true);
    });

    test('it wraps the <Destinations /> component', () => {
      // Set profile state to render the dashboard.
      props = {
        getCurrentProfile: jest.fn(),
        profileState: {
          profile: {
            user: {
              _id: 'test id',
            },
            bio: 'test bio',
            location: 'test location',
          },
          profiles: [],
          loading: false,
          error: {},
        },
      };
      wrapper = shallow(<Dashboard {...props} />);
      console.log(wrapper.debug({ verbose: true }));
      // Execute the test.
      const DestinationsChild = wrapper.find('Connect(Destinations)');
      expect(DestinationsChild.exists()).toBe(true);
    });

    test('it wraps the <Gears /> component', () => {
      // Set profile state to render the dashboard.
      props = {
        getCurrentProfile: jest.fn(),
        profileState: {
          profile: {
            user: {
              _id: 'test id',
            },
            bio: 'test bio',
            location: 'test location',
          },
          profiles: [],
          loading: false,
          error: {},
        },
      };
      wrapper = shallow(<Dashboard {...props} />);

      // Execute the test.
      const GearsChild = wrapper.find('Connect(Gears)');
      expect(GearsChild.exists()).toBe(true);
    });
  });
});
