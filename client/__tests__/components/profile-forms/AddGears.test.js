import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { AddGears } from '../../../src/components/profile-forms/AddGears';

// Globals for testing
let wrapper;
let props;
let mockAddGears = jest.fn();
let mockSetAlert = jest.fn();

describe('<AddGears /> component.', () => {
    beforeEach(() => {
        props = {
            addGears: mockAddGears,
            history: {
                push: jest.fn()
            },
            setAlert: mockSetAlert
        }

        wrapper = shallow(<AddGears {...props}/>);
    });

    describe('Successfully renders', () => {
        test('the component.', () => {
            expect(wrapper).toMatchSnapshot();
        });

        test('a link to the dashboard.', () => {
            const link = wrapper.find('Link');
            expect(link.props().to).toBe('/dashboard');
        });        
    });

    describe('The text box updates for', () => {
        test('the hiking gear text box.', () => {
            wrapper.find('input').at(0).simulate('change', {
                target: {
                    name: 'hikeGear',
                    value: 'test hiking gear'
                }
            });

            // Execute the test.
            expect(wrapper.find('input').at(0).props().value).toBe('test hiking gear');
        });

        test('the camping gear text box.', () => {
            wrapper.find('input').at(1).simulate('change', {
                target: {
                    name: 'campGear',
                    value: 'test camping gear'
                }
            });

            // Execute the test.
            expect(wrapper.find('input').at(1).props().value).toBe('test camping gear');
        });

        test('the water sports gear text box.', () => {
            wrapper.find('input').at(2).simulate('change', {
                target: {
                    name: 'waterGear',
                    value: 'test water sports gear'
                }
            });

            // Execute the test.
            expect(wrapper.find('input').at(2).props().value).toBe('test water sports gear');
        });

        test('the snow sports gear text box.', () => {
            wrapper.find('input').at(3).simulate('change', {
                target: {
                    name: 'snowGear',
                    value: 'test snow sports gear'
                }
            });

            // Execute the test.
            expect(wrapper.find('input').at(3).props().value).toBe('test snow sports gear');
        });

        test('the rock climbing gear text box.', () => {
            wrapper.find('input').at(4).simulate('change', {
                target: {
                    name: 'rockClimbingGear',
                    value: 'test rock climbing gear'
                }
            });

            // Execute the test.
            expect(wrapper.find('input').at(4).props().value).toBe('test rock climbing gear');
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

        test('the setAlert() action is fired if the form is empty.', () => {
            wrapper.find('form').simulate('submit', {
                preventDefault: () => {},
              });
            expect(mockSetAlert).toHaveBeenCalled();
        });

        test('the addGears() action is fired if the form is not empty.', () => {
            // Mock the React useState in order to set the conditionals required by the component

            // Save the original functionality to use
            let realUseState = React.useState;

            // Create a mock state with mock data
            let formFilledState = {
                hikeGear: 'test hike gear',
            };

            // Spy on the useState method to redefine its functionality,
            // which is to initialize the state using the original functionality.
            const useState = jest.spyOn(React, 'useState');

            const mockUseState = () => {
                useState.mockImplementationOnce(() => realUseState(formFilledState));
            };

            // Call the mock useState before rendering the node.
            props = {
                addGears: mockAddGears,
                history: {
                    push: jest.fn()
                },
                setAlert: mockSetAlert
            }
    
            mockUseState();
            wrapper = shallow(<AddGears {...props}/>);

            // Execute the test
            wrapper.find('form').simulate('submit', {
                preventDefault: () => {},
            });
            expect(mockAddGears).toHaveBeenCalled();
        });
    });
});