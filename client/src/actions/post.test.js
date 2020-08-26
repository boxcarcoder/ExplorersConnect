import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as postActions from './post';
import { convertToObject } from 'typescript';

// Create mock store that returns payloads as promises made possible by thunk
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Post Actions', () => {
  let store = mockStore();

  beforeEach(() => {
    // Clear any stored actions.
    store.clearActions();
  });

  describe('getAllPosts() action. ', () => {
    test('dispatches GET_ALL_POSTS', async () => {
      // Mock the response of the HTTP request
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            posts: [
              {
                user: {
                  _id: 'test id',
                },
                text: 'test post.',
                name: 'test name',
              },
              {
                user: {
                  _id: 'test id2',
                },
                text: 'test post2.',
                name: 'test name2',
              },
            ],
          },
        })
      );

      // Dispatch the action.
      await store.dispatch(postActions.getAllPosts());

      // Execute the test.
      const actions = store.getActions();
      let expectedActions = [
        {
          type: 'GET_ALL_POSTS',
          payload: {
            posts: [
              {
                user: {
                  _id: 'test id',
                },
                text: 'test post.',
                name: 'test name',
              },
              {
                user: {
                  _id: 'test id2',
                },
                text: 'test post2.',
                name: 'test name2',
              },
            ],
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });
});
