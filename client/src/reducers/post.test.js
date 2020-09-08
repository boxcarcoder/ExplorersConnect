import post from './post';
import {
  GET_ALL_POSTS,
  POSTS_ERROR,
  CREATE_POST,
  LIKE_A_POST,
  UNLIKE_A_POST,
  GET_POST,
  COMMENT_ON_POST,
  DELETE_POST,
  DELETE_COMMENT,
} from '../actions/types';

// Global variables for tests
let initialState = {};

describe('Post reducer.', () => {
  test('The initial state is returned.', () => {
    // Create a test action to send to the reducer.
    let testAction = {};

    // Send the test action to the reducer. The reducer is called with an undefined state.
    const reducer = post(undefined, testAction);

    // Execute the test.
    initialState = {
      post: null,
      posts: [],
      loading: true,
      error: {},
      deletedPost: false,
    };
    expect(reducer).toEqual(initialState);
  });

  describe('Receives the GET_ALL_POSTS action.', () => {
    test('Returns the correct state', () => {
      // Create a test action
      let testAction = {
        type: GET_ALL_POSTS,
        payload: [
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
      };

      // Send the test action to the reducer
      const reducer = post(undefined, testAction);

      // Execute the test
      const expectedState = {
        post: null,
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
        loading: false,
        error: {},
        deletedPost: false,
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receives the POSTS_ERROR action.', () => {
    test('Returns the correct state', () => {
      // Create a test action
      let testAction = {
        type: POSTS_ERROR,
        payload: {
          msg: {
            err: 'Error getting all posts.',
          },
        },
      };

      // Send the test action to the reducer
      const reducer = post(undefined, testAction);

      // Execute the test
      const expectedState = {
        post: null,
        posts: [],
        loading: false,
        error: {
          msg: {
            err: 'Error getting all posts.',
          },
        },
        deletedPost: false,
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receives the CREATE_POST action.', () => {
    test('Returns the correct state', () => {
      // Create a test action
      let testAction = {
        type: CREATE_POST,
        payload: {
          user: {
            _id: 'test id',
          },
          text: 'test post.',
          name: 'test name',
        },
      };

      // Send the test action to the reducer
      const reducer = post(undefined, testAction);

      // Execute the test
      const expectedState = {
        post: {
          user: {
            _id: 'test id',
          },
          text: 'test post.',
          name: 'test name',
        },
        posts: [
          {
            user: {
              _id: 'test id',
            },
            text: 'test post.',
            name: 'test name',
          },
        ],
        loading: false,
        error: {},
        deletedPost: false,
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receives the LIKE_A_POST action.', () => {
    // Create an initial state that has a post with a like already.
    const testPostId = 'testId';
    beforeEach(() => {
      initialState = {
        post: {
          _id: testPostId,
          user: {
            _id: 'test id',
          },
          text: 'test post.',
          name: 'test name',
          likes: [
            {
              user: {
                id: 'test id',
              },
            },
          ],
        },
        posts: [
          {
            _id: testPostId,
            user: {
              _id: 'test id',
            },
            text: 'test post.',
            name: 'test name',
            likes: [
              {
                user: {
                  id: 'test id',
                },
              },
            ],
          },
        ],
        loading: true,
        error: {},
        deletedPost: false,
      };
    });

    test('Returns the correct state', () => {
      // Create a test action
      let testAction = {
        type: LIKE_A_POST,
        payload: {
          id: testPostId,
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
      };

      // Send the test action to the reducer
      const reducer = post(initialState, testAction);

      // Execute the test
      const expectedState = {
        post: {
          _id: testPostId,
          user: {
            _id: 'test id',
          },
          text: 'test post.',
          name: 'test name',
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
        posts: [
          {
            _id: testPostId,
            user: {
              _id: 'test id',
            },
            text: 'test post.',
            name: 'test name',
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
        ],
        loading: false,
        error: {},
        deletedPost: false,
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receives the UNLIKE_A_POST action.', () => {
    // Create an initial state that has a post with 2 likes already.
    const testPostId = 'testId';
    beforeEach(() => {
      initialState = {
        post: {
          _id: testPostId,
          user: {
            _id: 'test id',
          },
          text: 'test post.',
          name: 'test name',
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
        posts: [
          {
            _id: testPostId,
            user: {
              _id: 'test id',
            },
            text: 'test post.',
            name: 'test name',
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
        ],
        loading: true,
        error: {},
        deletedPost: false,
      };
    });

    test('Returns the correct state', () => {
      // Create a test action
      let testAction = {
        type: UNLIKE_A_POST,
        payload: {
          id: testPostId,
          likes: [
            {
              user: {
                id: 'test id',
              },
            },
          ],
        },
      };

      // Send the test action to the reducer
      const reducer = post(initialState, testAction);

      // Execute the test
      const expectedState = {
        post: {
          _id: testPostId,
          user: {
            _id: 'test id',
          },
          text: 'test post.',
          name: 'test name',
          likes: [
            {
              user: {
                id: 'test id',
              },
            },
          ],
        },
        posts: [
          {
            _id: testPostId,
            user: {
              _id: 'test id',
            },
            text: 'test post.',
            name: 'test name',
            likes: [
              {
                user: {
                  id: 'test id',
                },
              },
            ],
          },
        ],
        loading: false,
        error: {},
        deletedPost: false,
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receives the GET_POST action.', () => {
    test('Returns the correct state', () => {
      // Create a test action.
      let testAction = {
        type: GET_POST,
        payload: {
          user: {
            _id: 'test id',
          },
          text: 'test post.',
          name: 'test name',
        },
      };

      // Send the test action to the reducer
      const reducer = post(undefined, testAction);

      // Execute the test
      const expectedState = {
        post: {
          user: {
            _id: 'test id',
          },
          text: 'test post.',
          name: 'test name',
        },
        posts: [],
        loading: false,
        error: {},
        deletedPost: false,
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receives the COMMENT_ON_POST action.', () => {
    // Create an initial state that has a post already to comment on.
    const testPostId = 'testId';
    beforeEach(() => {
      initialState = {
        post: {
          _id: testPostId,
          user: {
            _id: 'test id',
          },
          text: 'test post.',
          name: 'test name',
          comments: [],
        },
        posts: [
          {
            _id: testPostId,
            user: {
              _id: 'test id',
            },
            text: 'test post.',
            name: 'test name',
            comments: [],
          },
        ],
        loading: true,
        error: {},
        deletedPost: false,
      };
    });

    test('Returns the correct state', () => {
      // Create a test action
      let testAction = {
        type: COMMENT_ON_POST,
        payload: {
          id: testPostId,
          comments: [
            {
              user: {
                _id: 'test user',
              },
              text: 'test comment.',
            },
          ],
        },
      };

      // Send the test action to the reducer
      const reducer = post(initialState, testAction);

      // Execute the test
      const expectedState = {
        post: {
          _id: testPostId,
          user: {
            _id: 'test id',
          },
          text: 'test post.',
          name: 'test name',
          comments: [
            {
              user: {
                _id: 'test user',
              },
              text: 'test comment.',
            },
          ],
        },
        posts: [
          {
            _id: testPostId,
            user: {
              _id: 'test id',
            },
            text: 'test post.',
            name: 'test name',
            comments: [
              {
                user: {
                  _id: 'test user',
                },
                text: 'test comment.',
              },
            ],
          },
        ],
        loading: false,
        error: {},
        deletedPost: false,
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receives DELETE_POST action.', () => {
    // Create an initial state that has a post already to be deleted.
    const testPostId = 'testId';
    beforeEach(() => {
      initialState = {
        post: {
          _id: testPostId,
          user: {
            _id: 'test id',
          },
          text: 'test post.',
          name: 'test name',
          comments: [],
        },
        posts: [
          {
            _id: testPostId,
            user: {
              _id: 'test id',
            },
            text: 'test post.',
            name: 'test name',
            comments: [],
          },
        ],
        loading: true,
        error: {},
        deletedPost: false,
      };
    });

    test('Returns the correct state', () => {
      // Create a test action
      let testAction = {
        type: DELETE_POST,
        payload: {
          id: testPostId,
        },
      };

      // Send the test action to the reducer
      const reducer = post(initialState, testAction);

      // Execute the test
      const expectedState = {
        post: null,
        posts: [],
        loading: false,
        error: {},
        deletedPost: true,
      };
      expect(reducer).toEqual(expectedState);
    });
  });

  describe('Receives the DELETE_COMMENT action.', () => {
    // Create an initial state that has a post with a comment already to delete the comment.
    const testPostId = 'testId';
    const testCommentId = 'testComment2Id';

    beforeEach(() => {
      initialState = {
        post: {
          _id: testPostId,
          user: {
            _id: 'test id',
          },
          text: 'test post.',
          name: 'test name',
          comments: [
            {
              _id: testCommentId,
              user: {
                _id: 'test user',
              },
              text: 'test comment.',
            },
          ],
        },
        loading: true,
        error: {},
        deletedPost: false,
      };
    });

    test('Returns the correct state.', () => {
      // Create a test action
      let testAction = {
        type: DELETE_COMMENT,
        payload: {
          id: testCommentId,
          comments: [],
        },
      };

      // Send the test action to the reducer
      const reducer = post(initialState, testAction);

      // Execute the test
      const expectedState = {
        post: {
          _id: testPostId,
          user: {
            _id: 'test id',
          },
          text: 'test post.',
          name: 'test name',
          comments: [],
        },
        loading: false,
        error: {},
        deletedPost: false,
      };
      expect(reducer).toEqual(expectedState);
    });
  });
});
