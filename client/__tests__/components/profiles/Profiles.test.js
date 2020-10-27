import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { Profiles } from '../../../src/components/profiles/Profiles';

// Globals for testing
let wrapper;
let props;
let mockGetAllProfiles = jest.fn();


describe('<Profiles /> component.', () => {
    describe('Successfully renders', () => {
        test('the component.', () => {
            props = {
                profileState: {
                    profiles: [
                        {
                            user: 'test user id',
                            bio: 'test user bio',
                            location: 'test user location',
                        },
                        {
                            user: 'test user2 id',
                            bio: 'test user2 bio',
                            location: 'test user2 location',
                        },
                    ],
                    loading: false,
                },
                getAllProfiles: mockGetAllProfiles
            };
    
            wrapper = shallow(<Profiles {...props}/>);
            expect(wrapper).toMatchSnapshot();
        });

        test('a spinner if the loading property in the Profile state is true.', () => {
            // Set loading to true
            props = {
                profileState: {
                    profiles: [
                        {
                            user: 'test user id',
                            bio: 'test user bio',
                            location: 'test user location',
                        },
                        {
                            user: 'test user2 id',
                            bio: 'test user2 bio',
                            location: 'test user2 location',
                        },
                    ],
                    loading: true,
                },
                getAllProfiles: mockGetAllProfiles
            };
    
            wrapper = shallow(<Profiles {...props}/>);

             // Execute the test.
            const spinner = wrapper.find('Spinner');
            expect(spinner.exists()).toBe(true);
        });

        test('a spinner if there are no profiles in the Profiles state.', () => {
            // Set profiles to be empty.
            props = {
                profileState: {
                    profiles: [],
                    loading: false,
                },
                getAllProfiles: mockGetAllProfiles
            };
    
            wrapper = shallow(<Profiles {...props}/>);

            // Execute the test.
            const spinner = wrapper.find('Spinner');
            expect(spinner.exists()).toBe(true);
        });

        test('a ProfileItem component for each profile in the Profile state.', () => {
            props = {
                profileState: {
                    profiles: [
                        {
                            user: 'test user id',
                            bio: 'test user bio',
                            location: 'test user location',
                        },
                        {
                            user: 'test user2 id',
                            bio: 'test user2 bio',
                            location: 'test user2 location',
                        },
                    ],
                    loading: false,
                },
                getAllProfiles: mockGetAllProfiles
            };
    
            wrapper = shallow(<Profiles {...props}/>);

            // Execute the test.
            const profileItem1 = wrapper.find('ProfileItem').at(0);
            expect(profileItem1.exists()).toBe(true);

            const profileItem2 = wrapper.find('ProfileItem').at(1);
            expect(profileItem2.exists()).toBe(true);
        });
    });

    test('The getAllProfiles() action is fired after the first render.', () => {
        props = {
            profileState: {
                profiles: [
                    {
                        user: 'test user id',
                        bio: 'test user bio',
                        location: 'test user location',
                    },
                    {
                        user: 'test user2 id',
                        bio: 'test user2 bio',
                        location: 'test user2 location',
                    },
                ],
                loading: false,
            },
            getAllProfiles: mockGetAllProfiles
        };


        // Spy on the useEffect method.
        let useEffect = jest.spyOn(React, 'useEffect');

        // Re-define the useEffect method to run syncrhonously.
        let mockUseEffect = () => {
            useEffect.mockImplementationOnce((f) => f());
        }

        // Execute the test.
        mockUseEffect();
        wrapper = shallow(<Profiles {...props}/>);

        expect(mockGetAllProfiles).toHaveBeenCalled();
    });
});