import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { Destinations } from '../../../src/components/dashboard/Destinations';

// Globals for tests
let wrapper;
let props;
let mockDelete = jest.fn();

describe('<Destinations /> component.', () => {
  describe('Successfully renders', () => {
    test('with 0 destinations.', () => {
      props = {
        destinations: [],
        deleteDestinations: mockDelete,
      };

      wrapper = shallow(<Destinations {...props} />);

      // Execute the test.
      const destinationRow = wrapper.find('td');
      expect(destinationRow.exists()).toBe(false);
    });

    test('with existing destinations.', () => {
      props = {
        destinations: [
          {
            hikingTrails: 'test hike trail 2',
          },
          {
            hikingTrails: 'test hike trail 1',
            campSites: 'test camp site 1',
          },
        ],
        deleteDestinations: mockDelete,
      };
      wrapper = shallow(<Destinations {...props} />);

      // Execute the test.
      // Create snapshot of the DOM render.
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('If there are listed destinations,', () => {
    beforeEach(() => {
      props = {
        destinations: [
          {
            hikingTrails: 'test hike trail 2',
          },
          {
            hikingTrails: 'test hike trail 1',
            campSites: 'test camp site 1',
          },
        ],
        deleteDestinations: mockDelete,
      };
      wrapper = shallow(<Destinations {...props} />);
    });

    test('there are buttons to delete destinations.', () => {
      // Find the button in the shallow component.
      const deleteButton = wrapper.find('button');

      // Execute the test.
      expect(deleteButton.exists()).toBe(true);
    });

    test('clicking the delete button triggers the deleteDestinations() action.', () => {
      // Find the button in the shallow component.
      const deleteButton = wrapper.find('button').at(0);

      // Execute the test.
      deleteButton.simulate('click');
      expect(mockDelete).toHaveBeenCalled();
    });
  });
});
