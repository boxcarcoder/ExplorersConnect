import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { Profile } from '../../../src/components/profiles/Profile';

// Globals for testing
let wrapper;
let props;
let mockGetProfileById = jest.fn();
const mockRouteParam = 1;


describe('<Profile /> component.', () => {
    describe('When the component is rendered,', () => {
        test('the getProfileById() action is fired.', () => {
            // Spy on the useEffect from React so we can redefine it.
            let useEffect = jest.spyOn(React, 'useEffect');

            const mockUseEffect = () => {
                useEffect.mockImplementationOnce((f) => f());
            };

            props = {
                profileState: {
                    profile: {
                        user: 'test user id',
                        bio: 'test user bio',
                        location: 'test user location',
                    },
                    loading: false            
                },
                getProfileById: mockGetProfileById,
                match: {
                    params: {
                        id: mockRouteParam
                    }
                }
            };

            // Execute the test.
            mockUseEffect()    
            wrapper = shallow(<Profile {...props} />);
            expect(mockGetProfileById).toHaveBeenCalled();
        });
    });

    describe('Successfully renders', () => {
        beforeEach(() => {
            props = {
                profileState: {
                    profile: {
                        user: 'test user id',
                        bio: 'test user bio',
                        location: 'test user location',
                        Hiking: true,
                        Camping: true,
                        Kayaking: true,
                        Rafting: true,
                        Skiing: true,
                        Snowboarding: true,
                        Rockclimbing: true,
                        social: {
                            instagram: 'test instagram link',
                            twitter: 'test twitter link',
                            facebook: 'test facebook link',
                            youtube: 'test youtube link',
                        },
                        destinations: [
                            {
                                hikingTrails: 'test hike trail',
                                campSites: 'test camp site',
                                waterAreas: 'test water area',
                                slopes: 'test slope',
                                crags: 'test cliff',
                            }                            
                        ],
                        gears: [
                            {
                                hikeGear: 'test hike gear',
                                campGear: 'test camp gear',
                                waterGear: 'test water gear',
                                snowGear: 'test snow gear',
                                rockClimbingGear: 'test rock gear',

                            },

                        ]
                    },
                    loading: false,

                },
                getProfileById: mockGetProfileById,
                match: {
                    params: {
                        id: mockRouteParam
                    }
                }
            };

            wrapper = shallow(<Profile {...props} />);    
        });

        test('the Profile component.', () => {
            expect(wrapper).toMatchSnapshot();
        });

        test('a spinner while the loading state in the Profile redux state is true.', () => {
            // Set loading to true
            props = {
                profileState: {
                    profile: {
                        user: 'test user id',
                        bio: 'test user bio',
                        location: 'test user location',
                        Hiking: true,
                        Camping: true,
                        Kayaking: true,
                        Rafting: true,
                        Skiing: true,
                        Snowboarding: true,
                        Rockclimbing: true,
                        social: {
                            instagram: 'test instagram link',
                            twitter: 'test twitter link',
                            facebook: 'test facebook link',
                            youtube: 'test youtube link',
                        },
                        destinations: [
                            {
                                hikingTrails: 'test hike trail',
                                campSites: 'test camp site',
                                waterAreas: 'test water area',
                                slopes: 'test slope',
                                crags: 'test cliff',
                            }                            
                        ],
                        gears: [
                            {
                                hikeGear: 'test hike gear',
                                campGear: 'test camp gear',
                                waterGear: 'test water gear',
                                snowGear: 'test snow gear',
                                rockClimbingGear: 'test rock gear',

                            },

                        ]
                    },
                    loading: true,
                },
                getProfileById: mockGetProfileById,
                match: {
                    params: {
                        id: mockRouteParam
                    }
                }
            };

            wrapper = shallow(<Profile {...props} />);    

            expect(wrapper.find('Spinner').exists()).toBe(true);
        });

        test('a spinner while the loading state the profile in Profile state is null.', () => {
            // Set profile data to null to true
            props = {
                profileState: {
                    profile: null,
                    loading: false,
                },
                getProfileById: mockGetProfileById,
                match: {
                    params: {
                        id: mockRouteParam
                    }
                }
            };

            wrapper = shallow(<Profile {...props} />);    

            expect(wrapper.find('Spinner').exists()).toBe(true);
        });

        test('a link to the profiles page.', () => {
            const link = wrapper.find('Link');
            expect(link.props().to).toBe('/profiles');
        });

        describe('an icon for', () => {
            test('hiking if hiking is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('div').at(10).find('i').hasClass('fa-hiking')).toBe(true);
            });

            test('camping if camping is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('div').at(11).find('i').hasClass('fa-campground')).toBe(true);
            });

            test('kayaking if kayaking is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('div').at(12).find('i').hasClass('fa-water')).toBe(true);
            });

            test('rafting if rafting is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('div').at(13).find('i').hasClass('fa-tint')).toBe(true);
            });

            test('skiing if skiing is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('div').at(14).find('i').hasClass('fa-skiing')).toBe(true);
            });

            test('snowboarding if snowboarding is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('div').at(15).find('i').hasClass('fa-snowboarding')).toBe(true);
            });

            test('rock climbing if rock climbing is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('div').at(16).find('i').hasClass('fa-mountain')).toBe(true);
            });
        });

        describe('a list of favorite destinations for', () => {
            test('hiking if hiking is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('p').at(2).find('li').exists()).toBe(true);
            });

            test('camping if camping is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('p').at(3).find('li').exists()).toBe(true);
            });

            test('kayaking if kayaking is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('p').at(4).find('li').exists()).toBe(true);
            });

            test('rafting if rafting is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('p').at(4).find('li').exists()).toBe(true);
            });

            test('skiing if skiing is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('p').at(5).find('li').exists()).toBe(true);
            });

            test('snowboarding if snowboarding is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('p').at(5).find('li').exists()).toBe(true);
            });

            test('rockClimbing if rock climbing is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('p').at(6).find('li').exists()).toBe(true);
            });
        });

        describe('a list of favorite gears for', () => { 
            test('hiking if hiking is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('p').at(7).find('li').exists()).toBe(true);
            });

            test('camping if camping is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('p').at(8).find('li').exists()).toBe(true);
            });

            test('kayaking if kayaking is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('p').at(9).find('li').exists()).toBe(true);
            });

            test('rafting if rafting is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('p').at(9).find('li').exists()).toBe(true);
            });

            test('skiing if skiing is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('p').at(10).find('li').exists()).toBe(true);
            });

            test('snowboarding if snowboarding is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('p').at(10).find('li').exists()).toBe(true);
            });

            test('rockClimbing if rock climbing is one of the profile\'s favorite activities.', () => {
                expect(wrapper.find('p').at(11).find('li').exists()).toBe(true);
            });
        });

        describe('a link to', () => { 
            test('instagram if the profile has an instagram link.', () => {
                expect(wrapper.find('div').at(3).find('a').props().href).toBe('test instagram link');
            });
    
            test('twitter if the profile has a twitter link.', () => {
                expect(wrapper.find('div').at(4).find('a').props().href).toBe('test twitter link'); 
            });
    
            test('facebook if the profile has a facebook link.', () => {
                expect(wrapper.find('div').at(5).find('a').props().href).toBe('test facebook link');
            });
    
            test('youtube if the profile has a youtube link.', () => {
                expect(wrapper.find('div').at(6).find('a').props().href).toBe('test youtube link');       
            });
        });    
    });  
});
