import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { Gears } from '../../../src/components/dashboard/Gears';

// Globals for tests
let wrapper;
let props;
let mockDelete = jest.fn();

describe('<Gears /> component.', () => {
  describe('Successfully renders', () => {
    test('with 0 gears.', () => {
      props = {
        gears: [],
        deleteGears: mockDelete,
      };

      wrapper = shallow(<Gears {...props} />);

      // Execute the test.
      const firstGear = wrapper.find('td');
      expect(firstGear.exists()).toBe(false);
    });

    test('with existing gears.', () => {
      props = {
        gears: [
          {
            hikeGear: 'test hike gear 2',
            campGear: 'test camp gear 1',
          },
          {
            hikeGear: 'test hike gear 1',
          },
        ],
        deleteGears: mockDelete,
      };

      wrapper = shallow(<Gears {...props} />);

      // Execute the test.
      // Create snapshot of the DOM render.
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('If there are existing gears,', () => {
    beforeEach(() => {
      props = {
        gears: [
          {
            hikeGear: 'test hike gear 2',
            campGear: 'test camp gear 1',
          },
          {
            hikeGear: 'test hike gear 1',
          },
        ],
        deleteGears: mockDelete,
      };

      wrapper = shallow(<Gears {...props} />);
    });

    test('there are buttons to delete gears.', () => {
      const deleteButton = wrapper.find('button');

      // Execute the test.
      expect(deleteButton.exists()).toBe(true);
    });

    test('clicking the delete button triggers the deleteGears() action.', () => {
      const deleteButton = wrapper.find('button').at(0);

      deleteButton.simulate('click');
      expect(mockDelete).toHaveBeenCalled();
    });
  });
});
