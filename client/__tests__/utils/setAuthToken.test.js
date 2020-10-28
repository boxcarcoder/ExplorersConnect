import axios from 'axios';
import setAuthToken from '../../src/utils/setAuthToken';

// Use the real axios instead of the mocked axios to use
// a real axios request which will contain axios.defaults.headers.common
jest.unmock('axios');

describe('setAuthToken utility function.', () => {
    test('Sets the axios header, x-auth-token, with a token.', () => {
        let token = 'test token';

        setAuthToken(token);
        expect(axios.defaults.headers.common['x-auth-token']).toBe('test token');
    });

    test('Deletes the axios header.', () => {
        setAuthToken();
        expect(axios.defaults.headers.common['x-auth-token']).toBe(undefined);
    });
});