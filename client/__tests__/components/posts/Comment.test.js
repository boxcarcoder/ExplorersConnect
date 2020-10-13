import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { Comment } from '../../../src/components/posts/Comment';

// Globals for testing
let props;
let wrapper;
const mockGetPost = jest.fn();
const mockCommentOnPost = jest.fn();
const mockSetAlert = jest.fn();
const mockRouteParam = 1;

describe('<Comment /> component.', () => {
  describe('Successfully renders', () => {
    test('a spinner while the loading property in the Post state is true.', () => {
      // Set post state to render a spinner.
      props = {
        postState: {
          post: null,
          loading: true,
          deletedPost: false,
        },
        getPost: mockGetPost,
        commentOnPost: mockCommentOnPost,
        setAlert: mockSetAlert,
        authState: {
          isAuthenticated: false,
        },
        match: {
          params: {
            id: mockRouteParam,
          },
        },
      };
      wrapper = shallow(<Comment {...props} />);

      // Execute the test.
      const spinner = wrapper.find('Spinner');
      expect(spinner.exists()).toBe(true);
    });

    test('a redirect to the Posts component if the existing post has been deleted.', () => {
      // Set post state to render a redirect to Posts component.
      props = {
        postState: {
          post: null,
          loading: false,
          deletedPost: true,
        },
        getPost: mockGetPost,
        commentOnPost: mockCommentOnPost,
        setAlert: mockSetAlert,
        authState: {
          isAuthenticated: false,
        },
        match: {
          params: {
            id: mockRouteParam,
          },
        },
      };
      wrapper = shallow(<Comment {...props} />);

      // Execute the test.
      const redirect = wrapper.find('Redirect');
      expect(redirect.props().to).toBe('/posts');
    });

    test('the Comment component for the existing post.', () => {
      // Set post state to render the Comment component.
      props = {
        postState: {
          post: {
            user: 'test user',
            text: 'test post text.',
            comments: [
              {
                user: 'test user2',
                text: 'test comment text.',
              },
              {
                user: 'test user3',
                text: 'test comment text2.',
              },
            ],
          },
          loading: false,
          deletedPost: false,
        },
        getPost: mockGetPost,
        commentOnPost: mockCommentOnPost,
        setAlert: mockSetAlert,
        authState: {
          isAuthenticated: false,
        },
        match: {
          params: {
            id: mockRouteParam,
          },
        },
      };
      wrapper = shallow(<Comment {...props} />);

      // Execute the test.
      expect(wrapper).toMatchSnapshot();
    });
  });

  test('Calls the getPost() action on render.', () => {
    // Spy on React's useEffect method so we can mock it.
    let spyUseEffect = jest.spyOn(React, 'useEffect');

    // Wrap the spied-on function into a mock function to control how many times we can call it.
    const mockUseEffect = () => {
      // Re-define the useEffect method to take the callback function f, and call it synchronously.
      spyUseEffect.mockImplementationOnce((f) => f());
    };

    // Render the component to test if the action is fired.
    props = {
      postState: {
        post: {
          user: 'test user',
          text: 'test post text.',
          comments: [
            {
              user: 'test user2',
              text: 'test comment text.',
            },
            {
              user: 'test user3',
              text: 'test comment text2.',
            },
          ],
        },
        loading: false,
        deletedPost: false,
      },
      getPost: mockGetPost,
      commentOnPost: mockCommentOnPost,
      setAlert: mockSetAlert,
      authState: {
        isAuthenticated: false,
      },
      match: {
        params: {
          id: mockRouteParam,
        },
      },
    };

    // Call the useEffect mock function once.
    mockUseEffect();
    wrapper = shallow(<Comment {...props} />);

    expect(mockGetPost).toHaveBeenCalled();
  });

  describe('If the Comment component renders,', () => {
    beforeEach(() => {
      props = {
        postState: {
          post: {
            user: 'test user',
            text: 'test post text.',
            comments: [
              {
                user: 'test user2',
                text: 'test comment text.',
              },
              {
                user: 'test user3',
                text: 'test comment text2.',
              },
            ],
          },
          loading: false,
          deletedPost: false,
        },
        getPost: mockGetPost,
        commentOnPost: mockCommentOnPost,
        setAlert: mockSetAlert,
        authState: {
          isAuthenticated: true,
        },
        match: {
          params: {
            id: mockRouteParam,
          },
        },
      };
      wrapper = shallow(<Comment {...props} />);
    });

    test('it contains a link to the Posts component.', () => {
      const link = wrapper.find('Link');
      expect(link.props().to).toBe('/posts');
    });

    test('it renders the PostItem component.', () => {
      const postItem = wrapper.find('Connect(PostItem)');
      expect(postItem.exists()).toBe(true);
    });

    test('text updates for the comment input box.', () => {
      // Find the textarea within the component
      wrapper.find('textarea').simulate('change', {
        target: {
          name: 'text',
          value: 'test comment on post.',
        },
      });

      // Execute the test
      expect(wrapper.find('textarea').props().value).toBe(
        'test comment on post.'
      );
    });

    describe('when the form is submitted,', () => {
      test('the default event is cancelled.', () => {
        // The first div contains the onSubmit event handler in the Comment component.
        let eventPrevented = false;
        wrapper
          .find('div')
          .at(0)
          .simulate('submit', {
            preventDefault: () => {
              eventPrevented = true;
            },
          });

        // Execute the test.
        expect(eventPrevented).toBe(true);
      });

      test('fire the commentOnPost() action and setAlert() action if the user is authenticated.', () => {
        // The first div contains the onSubmit event handler in the Comment component.
        wrapper
          .find('div')
          .at(0)
          .simulate('submit', {
            preventDefault: () => {}, //simulate the submit request's need for an event object which contains a preventDefault function.
          });

        // Execute the test.
        expect(mockCommentOnPost).toHaveBeenCalled();
        expect(mockSetAlert).toHaveBeenCalled();
      });

      test('fire the setAlert() action if the user is not authenticated.', () => {
        // Set the props so that isAuthenticated is false.
        props = {
          postState: {
            post: {
              user: 'test user',
              text: 'test post text.',
              comments: [
                {
                  user: 'test user2',
                  text: 'test comment text.',
                },
                {
                  user: 'test user3',
                  text: 'test comment text2.',
                },
              ],
            },
            loading: false,
            deletedPost: false,
          },
          getPost: mockGetPost,
          commentOnPost: mockCommentOnPost,
          setAlert: mockSetAlert,
          authState: {
            isAuthenticated: false,
          },
          match: {
            params: {
              id: mockRouteParam,
            },
          },
        };
        wrapper = shallow(<Comment {...props} />);

        // The first div contains the onSubmit event handler in the Comment component.
        wrapper
          .find('div')
          .at(0)
          .simulate('submit', {
            preventDefault: () => {}, //simulate the submit request's need for an event object which contains a preventDefault function.
          });

        // Execute the test.
        expect(mockSetAlert).toHaveBeenCalled();
      });
    });

    test('it renders all comments for the relevant post.', () => {
      let commentItem = wrapper.find('Connect(CommentItem)').at(0);
      expect(commentItem.exists()).toBe(true);

      commentItem = wrapper.find('Connect(CommentItem)').at(1);
      expect(commentItem.exists()).toBe(true);
    });
  });
});
