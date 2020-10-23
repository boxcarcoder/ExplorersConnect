import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { ProfileItem } from '../../../src/components/profiles/ProfileItem';

// Globals for testing
let wrapper;
let props;

describe('<ProfileItem /> component.', () => {


    describe('Successfully renders', () => {
        test('the component.', () => {
            props = {
                profile: {
                    user: {
                        _id: 'test profile user id',
                        name: 'test profile name',
                        avatar: 'test profile avatar'
                    },
                    Hiking: false,
                    Camping: false,
                    Kayaking: false,
                    Rafting: false,
                    Skiing: false,
                    Snowboarding: false,
                    Rockclimbing: false,
                    location: 'test location',
                    bio: 'test bio',
                    faveRecreation: 'test fave recreation'
                },
            },
    
            wrapper = shallow(<ProfileItem {...props}/>);
            expect(wrapper).toMatchSnapshot();
        });

        test('a link to the profile.', () => {
            props = {
                profile: {
                    user: {
                        _id: 'test profile user id',
                        name: 'test profile name',
                        avatar: 'test profile avatar'
                    },
                    Hiking: false,
                    Camping: false,
                    Kayaking: false,
                    Rafting: false,
                    Skiing: false,
                    Snowboarding: false,
                    Rockclimbing: false,
                    location: 'test location',
                    bio: 'test bio',
                    faveRecreation: 'test fave recreation'
                },
            },
    
            wrapper = shallow(<ProfileItem {...props}/>);
            
            const link = wrapper.find('Link');
            expect(link.props().to).toBe('/profile/test profile user id');
        });

        describe('a check icon to indicate the profile partakes in the following activities:', () => {
            beforeEach(() => {
                props = {
                    profile: {
                        user: {
                            _id: 'test profile user id',
                            name: 'test profile name',
                            avatar: 'test profile avatar'
                        },
                        Hiking: true,
                        Camping: true,
                        Kayaking: true,
                        Rafting: true,
                        Skiing: true,
                        Snowboarding: true,
                        Rockclimbing: true,
                        location: 'test location',
                        bio: 'test bio',
                        faveRecreation: 'test fave recreation'
                    },
                },
        
                wrapper = shallow(<ProfileItem {...props}/>);
            });

            test('Hiking.', () => {
                const img = wrapper.find('div').at(0).find('ul').find('li').at(0).find('i');
                expect(img.hasClass('fa-check')).toBe(true);
            });

            test('Camping.', () => {
                const img = wrapper.find('div').at(0).find('ul').find('li').at(1).find('i');
                expect(img.hasClass('fa-check')).toBe(true);
            });

            test('Kayaking.', () => {
                const img = wrapper.find('div').at(0).find('ul').find('li').at(2).find('i');
                expect(img.hasClass('fa-check')).toBe(true);
            });

            test('Rafting.', () => {
                const img = wrapper.find('div').at(0).find('ul').find('li').at(3).find('i');
                expect(img.hasClass('fa-check')).toBe(true);
            });

            test('Skiing.', () => {
                const img = wrapper.find('div').at(0).find('ul').find('li').at(4).find('i');
                expect(img.hasClass('fa-check')).toBe(true);
            });

            test('Snowboarding.', () => {
                const img = wrapper.find('div').at(0).find('ul').find('li').at(5).find('i');
                expect(img.hasClass('fa-check')).toBe(true);
            });

            test('Rock Climbing.', () => {
                const img = wrapper.find('div').at(0).find('ul').find('li').at(6).find('i');
                expect(img.hasClass('fa-check')).toBe(true);
            });

        });

        describe('a heart icon to indicate the profile\'s favorite activity is:', () => {
            test('Hiking.', () => {
                // Set faveRecreation.
                props = {
                    profile: {
                        user: {
                            _id: 'test profile user id',
                            name: 'test profile name',
                            avatar: 'test profile avatar'
                        },
                        Hiking: true,
                        Camping: true,
                        Kayaking: true,
                        Rafting: true,
                        Skiing: true,
                        Snowboarding: true,
                        Rockclimbing: true,
                        location: 'test location',
                        bio: 'test bio',
                        faveRecreation: 'HikingFave'
                    },
                },
        
                wrapper = shallow(<ProfileItem {...props}/>);

                // Execute the test.
                const img = wrapper.find('div').at(0).find('ul').find('li').at(0).find('i');
                expect(img.hasClass('fa-heart')).toBe(true);
            });

            test('Camping.', () => {
                // Set faveRecreation.
                props = {
                    profile: {
                        user: {
                            _id: 'test profile user id',
                            name: 'test profile name',
                            avatar: 'test profile avatar'
                        },
                        Hiking: true,
                        Camping: true,
                        Kayaking: true,
                        Rafting: true,
                        Skiing: true,
                        Snowboarding: true,
                        Rockclimbing: true,
                        location: 'test location',
                        bio: 'test bio',
                        faveRecreation: 'CampingFave'
                    },
                },
        
                wrapper = shallow(<ProfileItem {...props}/>);

                // Execute the test.
                const img = wrapper.find('div').at(0).find('ul').find('li').at(1).find('i');
                expect(img.hasClass('fa-heart')).toBe(true);
            });

            test('Kayaking.', () => {
                // Set faveRecreation.
                props = {
                    profile: {
                        user: {
                            _id: 'test profile user id',
                            name: 'test profile name',
                            avatar: 'test profile avatar'
                        },
                        Hiking: true,
                        Camping: true,
                        Kayaking: true,
                        Rafting: true,
                        Skiing: true,
                        Snowboarding: true,
                        Rockclimbing: true,
                        location: 'test location',
                        bio: 'test bio',
                        faveRecreation: 'KayakingFave'
                    },
                },
        
                wrapper = shallow(<ProfileItem {...props}/>);

                // Execute the test.
                const img = wrapper.find('div').at(0).find('ul').find('li').at(2).find('i');
                expect(img.hasClass('fa-heart')).toBe(true);
            });
        });

        test('Rafting.', () => {
            // Set faveRecreation.
            props = {
                profile: {
                    user: {
                        _id: 'test profile user id',
                        name: 'test profile name',
                        avatar: 'test profile avatar'
                    },
                    Hiking: true,
                    Camping: true,
                    Kayaking: true,
                    Rafting: true,
                    Skiing: true,
                    Snowboarding: true,
                    Rockclimbing: true,
                    location: 'test location',
                    bio: 'test bio',
                    faveRecreation: 'RaftingFave'
                },
            },
    
            wrapper = shallow(<ProfileItem {...props}/>);

            // Execute the test.
            const img = wrapper.find('div').at(0).find('ul').find('li').at(3).find('i');
            expect(img.hasClass('fa-heart')).toBe(true);
        });

        test('Skiing.', () => {
            // Set faveRecreation.
            props = {
                profile: {
                    user: {
                        _id: 'test profile user id',
                        name: 'test profile name',
                        avatar: 'test profile avatar'
                    },
                    Hiking: true,
                    Camping: true,
                    Kayaking: true,
                    Rafting: true,
                    Skiing: true,
                    Snowboarding: true,
                    Rockclimbing: true,
                    location: 'test location',
                    bio: 'test bio',
                    faveRecreation: 'SkiingFave'
                },
            },
    
            wrapper = shallow(<ProfileItem {...props}/>);

            // Execute the test.
            const img = wrapper.find('div').at(0).find('ul').find('li').at(4).find('i');
            expect(img.hasClass('fa-heart')).toBe(true);
        });

        test('Snowboarding.', () => {
            // Set faveRecreation.
            props = {
                profile: {
                    user: {
                        _id: 'test profile user id',
                        name: 'test profile name',
                        avatar: 'test profile avatar'
                    },
                    Hiking: true,
                    Camping: true,
                    Kayaking: true,
                    Rafting: true,
                    Skiing: true,
                    Snowboarding: true,
                    Rockclimbing: true,
                    location: 'test location',
                    bio: 'test bio',
                    faveRecreation: 'SnowboardingFave'
                },
            },
    
            wrapper = shallow(<ProfileItem {...props}/>);

            // Execute the test.
            const img = wrapper.find('div').at(0).find('ul').find('li').at(5).find('i');
            expect(img.hasClass('fa-heart')).toBe(true);
        });

        test('Rock Climbing.', () => {
            // Set faveRecreation.
            props = {
                profile: {
                    user: {
                        _id: 'test profile user id',
                        name: 'test profile name',
                        avatar: 'test profile avatar'
                    },
                    Hiking: true,
                    Camping: true,
                    Kayaking: true,
                    Rafting: true,
                    Skiing: true,
                    Snowboarding: true,
                    Rockclimbing: true,
                    location: 'test location',
                    bio: 'test bio',
                    faveRecreation: 'RockClimbingFave'
                },
            },
    
            wrapper = shallow(<ProfileItem {...props}/>);

            // Execute the test.
            const img = wrapper.find('div').at(0).find('ul').find('li').at(6).find('i');
            expect(img.hasClass('fa-heart')).toBe(true);
        });
    });
});


// console.log(wrapper.find('div').at(0).find('ul').find('li').at(0).debug({verbose:true}));
