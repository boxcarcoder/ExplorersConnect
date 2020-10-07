import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { Dashboard } from '../../../src/components/dashboard/Dashboard';

// Globals for tests
let props;
let wrapper;
let mockGetCurrentProfile = jest.fn();

describe('<Dashboard /> component.', () => {
  describe('Successfully renders', () => {
    test('a spinner while the loading property in the Profile state is true.', () => {
      // Set profile state to render a spinner.
      props = {
        getCurrentProfile: mockGetCurrentProfile,
        profileState: {
          profile: null,
          loading: true,
        },
      };
      wrapper = shallow(<Dashboard {...props} />);

      // Execute the test
      const spinner = wrapper.find('Spinner');
      expect(spinner.exists()).toBe(true);
    });

    test('a link to create a profile if the profile property in the Profile state is empty.', () => {
      // Set profile state to render the prompt to create profile.
      props = {
        getCurrentProfile: mockGetCurrentProfile,
        profileState: {
          profile: null,
          loading: false,
        },
      };
      wrapper = shallow(<Dashboard {...props} />);

      // Execute the test.
      const link = wrapper.find('Link');
      expect(link.props().to).toBe('/create-profile');
    });

    test('a Dashboard if the profile property in the Profile state is populated.', () => {
      // Set profile state to render the dashboard.
      props = {
        getCurrentProfile: mockGetCurrentProfile,
        profileState: {
          profile: {
            user: {
              _id: 'test id',
            },
            bio: 'test bio',
            location: 'test location',
          },
          loading: false,
        },
      };
      wrapper = shallow(<Dashboard {...props} />);

      // Execute the test.
      // Create snapshot of the DOM render.
      expect(wrapper).toMatchSnapshot();
    });
  });

  test('Calls the getCurrentProfile action on render.', () => {
    // Spy on React's useEffect method so we can mock it.
    let useEffect = jest.spyOn(React, 'useEffect');

    // Wrap the mock function into a function to control how many times we can call it.
    const mockUseEffect = () => {
      // Re-define the useEffect method to take the callback function f, and call it synchronously.
      useEffect.mockImplementationOnce((f) => f());
    };

    // Render the component to test if the action is fired.
    props = {
      getCurrentProfile: mockGetCurrentProfile,
      profileState: {
        profile: {
          user: {
            _id: 'test id',
          },
          bio: 'test bio',
          location: 'test location',
        },
        loading: false,
      },
    };

    // Call the useEffect mock function once.
    mockUseEffect();
    wrapper = shallow(<Dashboard {...props} />);

    expect(mockGetCurrentProfile).toHaveBeenCalled();
  });

  describe('If a dashboard is rendered, ', () => {
    beforeEach(() => {
      // Set profile state to render the dashboard.
      props = {
        getCurrentProfile: mockGetCurrentProfile,
        profileState: {
          profile: {
            user: {
              _id: 'test id',
            },
            bio: 'test bio',
            location: 'test location',
          },
          loading: false,
        },
      };
      wrapper = shallow(<Dashboard {...props} />);
    });
    test('it renders the <DashboardButtons /> component', () => {
      const DashboardButtonsChild = wrapper.find('DashboardButtons');
      expect(DashboardButtonsChild.exists()).toBe(true);
    });

    test('it renders the <Destinations /> component', () => {
      const DestinationsChild = wrapper.find('Connect(Destinations)');
      expect(DestinationsChild.exists()).toBe(true);
    });

    test('it renders the <Gears /> component', () => {
      const GearsChild = wrapper.find('Connect(Gears)');
      expect(GearsChild.exists()).toBe(true);
    });
  });
});
