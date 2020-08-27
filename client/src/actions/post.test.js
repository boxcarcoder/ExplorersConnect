import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as postActions from './post';

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
      const expectedActions = [
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

    test('dispatches POST_ERROR', async () => {
      // Mock the response of the HTTP request
      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error getting all posts.',
        })
      );

      // Dispatch the action.
      await store.dispatch(postActions.getAllPosts());

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'POSTS_ERROR',
          payload: {
            msg: {
              err: 'Error getting all posts.',
            },
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });

  describe('addPost() action.', () => {
    test('dipatches CREATE_POST', async () => {
      // Mock the response of the HTTP request.
      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            user: {
              _id: 'test id',
            },
            text: 'test post.',
            name: 'test name',
          },
        })
      );

      // Dispatch the action.
      let testPost = {
        _id: 'test id',
        text: 'test post.',
        name: 'test name',
      };
      let { _id, text, name } = testPost;
      await store.dispatch(postActions.addPost({ _id, text, name }));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'CREATE_POST',
          payload: {
            user: {
              _id: 'test id',
            },
            text: 'test post.',
            name: 'test name',
          },
        },
      ];
      expect(actions[0]).toEqual(expectedActions[0]);
    });

    test('dispatches POST_ERROR', async () => {
      // Mock the response of the HTTP request
      mockAxios.post.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error getting all posts.',
        })
      );

      // Dispatch the action.
      let testPost = {
        _id: 'test id',
        text: 'test post.',
        name: 'test name',
      };
      let { _id, text, name } = testPost;
      await store.dispatch(postActions.addPost({ _id, text, name }));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'POSTS_ERROR',
          payload: {
            msg: {
              err: 'Error getting all posts.',
            },
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });
});
