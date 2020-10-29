import React from 'react';
import {  mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

// Import the non-connected component
import { PrivateRoute } from '../../../src/components/routing/PrivateRoute';

// Globals for testing
let wrapper;
let props;
let mockComponent = () => <div>Component</div> ;

describe('<PrivateRoute /> component.', () => {
    describe('Successfully renders', () => {
        test('the component.', () => {
            props = {
                component: mockComponent,
                authState: {
                    isAuthenticated: true,
                    loading: false
                }
            }

            wrapper = mount(
                <MemoryRouter> 
                    <PrivateRoute {...props} />
                </MemoryRouter>);
            expect(wrapper).toMatchSnapshot();
        });

        test('a Redirect to the login page if isAuthenticated and loading are false in the Auth redux state.', () => {
            props = {
                component: mockComponent,
                authState: {
                    isAuthenticated: false,
                    loading: false
                }
            }

            wrapper = mount(
                <MemoryRouter> 
                    <PrivateRoute {...props} />
                </MemoryRouter>);

            const history = wrapper.find('Router').prop('history');
            expect(history.location.pathname).toBe('/login');
        });

    });

});