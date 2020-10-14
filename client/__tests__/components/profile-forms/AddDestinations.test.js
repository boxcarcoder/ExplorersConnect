import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { AddDestinations } from '../../../src/components/profile-forms/AddDestinations';

// Globals for testing
let wrapper;
let props;
let mockAddDestinations = jest.fn();
let mockSetAlert = jest.fn();

describe('<AddDestinations /> component.', () => {
  beforeEach(() => {
    props = {
      addDestinations: mockAddDestinations,
      history: {
        push: jest.fn(),
      },
      setAlert: mockSetAlert,
    };

    wrapper = shallow(<AddDestinations {...props} />);
  });

  describe('Successfully renders', () => {
    test('the component.', () => {
      props = {
        addDestinations: mockAddDestinations,
        history: {
          push: jest.fn(),
        },
        setAlert: mockSetAlert,
      };

      wrapper = shallow(<AddDestinations {...props} />);
      expect(wrapper).toMatchSnapshot();
    });

    test('a link to the dashboard.', () => {
      const link = wrapper.find('Link');
      expect(link.props().to).toBe('/dashboard');
    });
  });

  describe('The text box updates for', () => {
    test('the hiking trails text box.', () => {
      // Find the input box to simulate a change
      wrapper
        .find('input')
        .at(0)
        .simulate('change', {
          target: {
            //event.target.attributes defined in the JSX of the input element
            name: 'hikingTrails',
            value: 'test hiking trail',
          },
        });

      // Check the rendered element after simulating a change
      // to see if its value attribute's value updated
      expect(wrapper.find('input').at(0).props().value).toBe(
        'test hiking trail'
      );
    });

    test('the campsites text box.', () => {
      // Find the input box to simulate a change
      wrapper
        .find('input')
        .at(1)
        .simulate('change', {
          target: {
            //event.target.attributes defined in the JSX of the input element
            name: 'campSites',
            value: 'test campsite',
          },
        });

      // Check the rendered element after simulating a change
      // to see if its value attribute's value updated
      expect(wrapper.find('input').at(1).props().value).toBe('test campsite');
    });

    test('the body of water text box.', () => {
      // Find the input box to simulate a change
      wrapper
        .find('input')
        .at(2)
        .simulate('change', {
          target: {
            //event.target.attributes defined in the JSX of the input element
            name: 'waterAreas',
            value: 'test lake',
          },
        });

      // Check the rendered element after simulating a change
      // to see if its value attribute's value updated
      expect(wrapper.find('input').at(2).props().value).toBe('test lake');
    });

    test('the slopes text box.', () => {
      // Find the input box to simulate a change
      wrapper
        .find('input')
        .at(3)
        .simulate('change', {
          target: {
            //event.target.attributes defined in the JSX of the input element
            name: 'slopes',
            value: 'test slopes',
          },
        });

      // Check the rendered element after simulating a change
      // to see if its value attribute's value updated
      expect(wrapper.find('input').at(3).props().value).toBe('test slopes');
    });

    test('the crags text box.', () => {
      // Find the input box to simulate a change
      wrapper
        .find('input')
        .at(4)
        .simulate('change', {
          target: {
            //event.target.attributes defined in the JSX of the input element
            name: 'crags',
            value: 'test cliff',
          },
        });

      // Check the rendered element after simulating a change
      // to see if its value attribute's value updated
      expect(wrapper.find('input').at(4).props().value).toBe('test cliff');
    });
  });

  describe('When the form is submitted,', () => {
    test('the default event is prevented.', () => {
      let eventPrevented = false;
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {
          eventPrevented = true;
        },
      });

      expect(eventPrevented).toBe(true);
    });

    test('the setAlert() action is triggered if the form is empty.', () => {
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
      });
      expect(mockSetAlert).toHaveBeenCalled();
    });

    test('the addDestinations() action is triggered if the form is not empty.', () => {
      // Mock the React useState in order to set the conditionals required by the component

      // Save the original functionality to use
      let realUseState = React.useState;

      // Create a mock state with mock data
      let formFilledState = {
        hikingTrails: 'test hike trail',
      };

      // Spy on the useState method to redefine its functionality,
      // which is to initialize the state using the original functionality.
      const useState = jest.spyOn(React, 'useState');

      const mockUseState = () => {
        useState.mockImplementationOnce(() => realUseState(formFilledState));
      };

      // Call the mock useState before rendering the node.
      props = {
        addDestinations: mockAddDestinations,
        history: {
          push: jest.fn(),
        },
        setAlert: mockSetAlert,
      };

      mockUseState();
      wrapper = shallow(<AddDestinations {...props} />);

      // Execute the test
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
      });
      expect(mockAddDestinations).toHaveBeenCalled();
    });
  });
});
