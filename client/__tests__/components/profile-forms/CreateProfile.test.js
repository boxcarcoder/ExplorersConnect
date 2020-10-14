import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { CreateProfile } from '../../../src/components/profile-forms/CreateProfile';

// Globals for testing
let wrapper;
let props;
let mockCreateProfile = jest.fn();

describe('<CreateProfile /> component.', () => {
    beforeEach(() => {
        props = {
            createProfile: mockCreateProfile,
            history: {
                push: jest.fn()
            }
        };
        wrapper = shallow(<CreateProfile {...props}/>);
    })
    describe('Successfully renders', () => {
        test('the component.', () => {
            expect(wrapper).toMatchSnapshot();
        });

        test('a link to the dashboard.', () => {
            const link = wrapper.find('Link');
            expect(link.props().to).toBe('/dashboard');
        });  

        test('the textboxes for social medias when toggled on.', () => {
            wrapper.find('button').simulate('click');
            // twitter textbox
            expect(wrapper.find('input').at(9).props().name).toBe('twitter');

            // facebook textbox
            expect(wrapper.find('input').at(10).props().name).toBe('facebook');

            // youtube textbox
            expect(wrapper.find('input').at(11).props().name).toBe('youtube');

            // instagram textbox
            expect(wrapper.find('input').at(12).props().name).toBe('instagram');

        })
    });

    describe('The checkbox updates for', () => {
        test('the hiking checkbox.', () => {
            wrapper.find('input').at(0).simulate('change', {
                target: {
                    name: 'Hiking',
                    checked: true,
                }
            })

            // Execute the test
            expect(wrapper.find('input').at(0).props().checked).toBe(true);
        });

        test('the camping checkbox.', () => {
            wrapper.find('input').at(1).simulate('change', {
                target: {
                    name: 'Camping',
                    checked: true,
                }
            })

            // Execute the test
            expect(wrapper.find('input').at(1).props().checked).toBe(true);
        });

        test('the kayaking checkbox.', () => {
            wrapper.find('input').at(2).simulate('change', {
                target: {
                    name: 'Kayaking',
                    checked: true,
                }
            })

            // Execute the test
            expect(wrapper.find('input').at(2).props().checked).toBe(true);
        });

        test('the rafting checkbox.', () => {
            wrapper.find('input').at(3).simulate('change', {
                target: {
                    name: 'Rafting',
                    checked: true,
                }
            })

            // Execute the test
            expect(wrapper.find('input').at(3).props().checked).toBe(true);
        });

        test('the skiing checkbox.', () => {
            wrapper.find('input').at(4).simulate('change', {
                target: {
                    name: 'Skiing',
                    checked: true,
                }
            })

            // Execute the test
            expect(wrapper.find('input').at(4).props().checked).toBe(true);
        });

        test('the snowboarding checkbox.', () => {
            wrapper.find('input').at(5).simulate('change', {
                target: {
                    name: 'Snowboarding',
                    checked: true,
                }
            })

            // Execute the test
            expect(wrapper.find('input').at(5).props().checked).toBe(true);
        });

        test('the rock climbing checkbox.', () => {
            wrapper.find('input').at(6).simulate('change', {
                target: {
                    name: 'Rockclimbing',
                    checked: true,
                }
            })

            // Execute the test
            expect(wrapper.find('input').at(6).props().checked).toBe(true);
        });
    });

    describe('The dropdown updates for', () => {
        test('the favorite outdoor recreation dropdown list.', () => {
            wrapper.find('select').simulate('change', { 
                target: {
                    name: 'faveRecreation',
                    value: 'CampingFave'
                }
            });

            //Execute the test.
            expect(wrapper.find('select').props().value).toBe('CampingFave');
        });
    });

    describe('The textbox updates for', () => {
        test('the personal website textbox.', () => {
            wrapper.find('input').at(7).simulate('change', {
                target: {
                    name:'website',
                    value: 'test website'
                }
            });

            // Execute the test
            expect(wrapper.find('input').at(7).props().value).toBe('test website');
        });

        test('the bio textbox.', () => {
            wrapper.find('textarea').simulate('change', {
                target: {
                    name:'bio',
                    value: 'test bio'
                }
            });

            // Execute the test
            expect(wrapper.find('textarea').props().value).toBe('test bio');
        });

        test('the location textbox.', () => {
            wrapper.find('input').at(8).simulate('change', {
                target: {
                    name:'location',
                    value: 'test location'
                }
            });

            // Execute the test
            expect(wrapper.find('input').at(8).props().value).toBe('test location');
        });
    });

    describe('The textbox updates for the following social medias:', () => {
        beforeEach(() => {
            // Click the display social media button to render them.
            wrapper.find('button').simulate('click');
        });

        test('twitter.', () => {
            wrapper.find('input').at(9).simulate('change', {
                target: {
                    name: 'twitter',
                    value: 'test twitter link'
                }
            });

            // Execute the test.
            expect(wrapper.find('input').at(9).props().value).toBe('test twitter link');
        });

        test('facebook.', () => {
            wrapper.find('input').at(10).simulate('change', {
                target: {
                    name: 'facebook',
                    value: 'test facebook link'
                }
            });

            // Execute the test.
            expect(wrapper.find('input').at(10).props().value).toBe('test facebook link');
        });

        test('youtube.', () => {
            wrapper.find('input').at(11).simulate('change', {
                target: {
                    name: 'youtube',
                    value: 'test youtube link'
                }
            });

            // Execute the test.
            expect(wrapper.find('input').at(11).props().value).toBe('test youtube link');
        });

        test('instagram.', () => {
            wrapper.find('input').at(12).simulate('change', {
                target: {
                    name: 'instagram',
                    value: 'test instagram link'
                }
            });

            // Execute the test.
            expect(wrapper.find('input').at(12).props().value).toBe('test instagram link');
        });
    });

    describe('When the form is submitted', () => {
        test('the default event is prevented.', () => {
            let eventPrevented = false;
            wrapper.find('form').simulate('submit', {
                preventDefault: () => {
                    eventPrevented = true;
                },
            });
        
            expect(eventPrevented).toBe(true);
        });

        test('the createProfile() action is fired.', () => {
            wrapper.find('form').simulate('submit', {
                preventDefault: () => {},
            });        

            expect(mockCreateProfile).toHaveBeenCalled();
        });
    })
});
