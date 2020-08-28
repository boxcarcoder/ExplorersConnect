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

    test('dispatches POSTS_ERROR', async () => {
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
        text: 'test post.',
      };
      let { text } = testPost;
      await store.dispatch(postActions.addPost({ text }));

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

    test('dispatches POSTS_ERROR', async () => {
      // Mock the response of the HTTP request
      mockAxios.post.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error adding a post.',
        })
      );

      // Dispatch the action.
      let testPost = {
        text: 'test post.',
      };
      let { text } = testPost;
      await store.dispatch(postActions.addPost({ text }));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'POSTS_ERROR',
          payload: {
            msg: {
              err: 'Error adding a post.',
            },
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });

  describe('likePost() action.', () => {
    test('dispatches LIKE_A_POST.', async () => {
      // Mock the response of the HTTP request.
      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: [
            {
              user: {
                id: 'test id',
              },
            },
            {
              user: {
                id: 'test id2',
              },
            },
          ],
        })
      );

      // Dispatch the action.
      let testId = 'testId';
      await store.dispatch(postActions.likePost(testId));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'LIKE_A_POST',
          payload: {
            id: testId,
            likes: [
              {
                user: {
                  id: 'test id',
                },
              },
              {
                user: {
                  id: 'test id2',
                },
              },
            ],
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });

    test('dispatches POSTS_ERROR', async () => {
      // Mock the response of the HTTP request
      mockAxios.put.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error liking a post.',
        })
      );

      // Dispatch the action.
      let testId = 'testId';
      await store.dispatch(postActions.likePost(testId));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'POSTS_ERROR',
          payload: {
            msg: {
              err: 'Error liking a post.',
            },
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });

  describe('unlikePost() action.', () => {
    test('dispatches UNLIKE_A_POST.', async () => {
      // Mock the response of the HTTP request
      mockAxios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: [
            {
              user: {
                id: 'test id',
              },
            },
          ],
        })
      );

      // Dispatch the action.
      let testId = 'testId';
      await store.dispatch(postActions.unlikePost(testId));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'UNLIKE_A_POST',
          payload: {
            id: testId,
            likes: [
              {
                user: {
                  id: 'test id',
                },
              },
            ],
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });

    test('dispatches POSTS_ERROR', async () => {
      // Mock the response of the HTTP request
      mockAxios.put.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error liking a post.',
        })
      );

      // Dispatch the action.
      let testId = 'testId';
      await store.dispatch(postActions.unlikePost(testId));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'POSTS_ERROR',
          payload: {
            msg: {
              err: 'Error liking a post.',
            },
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });

  describe('getPost() action.', () => {
    test('dispatches GET_POST.', async () => {
      // Mock the response of the HTTP request.
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            post: {
              user: {
                _id: 'test id',
              },
              text: 'test post.',
              name: 'test name',
            },
          },
        })
      );

      // Dispatch the action.
      let testId = 'testId';
      await store.dispatch(postActions.getPost(testId));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'GET_POST',
          payload: {
            post: {
              user: {
                _id: 'test id',
              },
              text: 'test post.',
              name: 'test name',
            },
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });

    test('dispatches POSTS_ERROR', async () => {
      // Mock the response of the HTTP request.
      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error getting post.',
        })
      );

      // Dispatch the action.
      let testId = 'testId';
      await store.dispatch(postActions.getPost(testId));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'POSTS_ERROR',
          payload: {
            msg: {
              err: 'Error getting post.',
            },
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });

  describe('commentOnPost() action.', () => {
    test('dispatches COMMENT_ON_POST.', async () => {
      // Mock the response of the HTTP request.
      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: [
            {
              user: {
                _id: 'test user',
              },
              text: 'test comment.',
            },
            {
              user: {
                _id: 'test user2',
              },
              text: 'test comment2.',
            },
          ],
        })
      );

      // Dispatch the action.
      let testComment = {
        text: 'test comment2.',
      };
      const { text } = testComment;
      let testId = 'testId';
      await store.dispatch(postActions.commentOnPost(testId, { text }));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'COMMENT_ON_POST',
          payload: {
            id: testId,
            comments: [
              {
                user: {
                  _id: 'test user',
                },
                text: 'test comment.',
              },
              {
                user: {
                  _id: 'test user2',
                },
                text: 'test comment2.',
              },
            ],
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });

    test('dispatches POSTS_ERROR', async () => {
      // Mock the response of the HTTP request.
      mockAxios.post.mockImplementationOnce(() =>
        Promise.reject({
          err: 'Error getting post.',
        })
      );

      // Dispatch the action.
      let testComment = {
        text: 'test comment2.',
      };
      const { text } = testComment;
      let testId = 'testId';
      await store.dispatch(postActions.commentOnPost(testId, { text }));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'POSTS_ERROR',
          payload: {
            msg: {
              err: 'Error getting post.',
            },
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });

  // ============
  describe('deletePost() action.', () => {
    test('dispatches DELETE_POST.', async () => {
      // Mock the response of the HTTP request.
      mockAxios.delete.mockImplementation(() =>
        Promise.resolve({
          data: 'Post removed.',
        })
      );

      // Dispatch the action.
      let testId = 'testId';
      await store.dispatch(postActions.deletePost(testId));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'DELETE_POST',
          payload: {
            id: testId,
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });

    test('dispatches POSTS_ERROR', async () => {
      // Mock the response of the HTTP request.
      mockAxios.delete.mockImplementation(() =>
        Promise.reject({
          err: 'Failed to remove post.',
        })
      );

      // Dispatch the action.
      let testId = 'testId';
      await store.dispatch(postActions.deletePost(testId));

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'POSTS_ERROR',
          payload: {
            msg: {
              err: 'Failed to remove post.',
            },
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });

  describe('deleteComment() action.', () => {
    test('dispatches DELETE_COMMENT.', async () => {
      // Mock the response of the HTTP request.
      mockAxios.delete.mockImplementation(() =>
        Promise.resolve({
          data: [
            {
              user: {
                _id: 'test user',
              },
              text: 'test comment.',
            },
            {
              user: {
                _id: 'test user2',
              },
              text: 'test comment2.',
            },
          ],
        })
      );

      // Dispatch the action.
      let testCommentId = 'testCommentId';
      let testPostId = 'testpostId';
      await store.dispatch(
        postActions.deleteComment(testPostId, testCommentId)
      );

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'DELETE_COMMENT',
          payload: {
            id: testCommentId,
            comments: [
              {
                user: {
                  _id: 'test user',
                },
                text: 'test comment.',
              },
              {
                user: {
                  _id: 'test user2',
                },
                text: 'test comment2.',
              },
            ],
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });

    test('dispatches POSTS_ERROR', async () => {
      // Mock the response of the HTTP request.
      mockAxios.delete.mockImplementation(() =>
        Promise.reject({
          err: 'Failed to delete comment.',
        })
      );

      // Dispatch the action.
      let testCommentId = 'testCommentId';
      let testPostId = 'testpostId';
      await store.dispatch(
        postActions.deleteComment(testPostId, testCommentId)
      );

      // Execute the test.
      const actions = store.getActions();
      const expectedActions = [
        {
          type: 'POSTS_ERROR',
          payload: {
            msg: {
              err: 'Failed to delete comment.',
            },
          },
        },
      ];
      expect(actions).toEqual(expectedActions);
    });
  });
});
