import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component. The default export for DashboardButtons is non-connected.
import DashboardButtons from '../../../src/components/dashboard/DashboardButtons';

// Globals for tests
let wrapper;

describe('<DashboardButtons /> component.', () => {
  beforeEach(() => {
    wrapper = shallow(<DashboardButtons />);
  });

  test('Successfully renders.', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('Includes a link to', () => {
    test('edit profile.', () => {
      // Search for the link to /edit-profile.
      const link = wrapper.find('Link').at(0);

      // Execute the test.
      expect(link.props().to).toBe('/edit-profile');
    });

    test('add destinations.', () => {
      // Search for the link to /edit-profile.
      const link = wrapper.find('Link').at(1);

      // Execute the test.
      expect(link.props().to).toBe('/add-destinations');
    });

    test('add gears.', () => {
      // Search for the link to /edit-profile.
      const link = wrapper.find('Link').at(2);

      // Execute the test.
      expect(link.props().to).toBe('/add-gears');
    });
  });
});
