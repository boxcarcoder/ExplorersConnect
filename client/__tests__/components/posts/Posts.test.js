import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { Posts } from '../../../src/components/posts/Posts';

// Globals for testing
let props;
let wrapper;
let mockGetAllPosts = jest.fn();
let mockAddPost = jest.fn();

describe('<Posts /> component.', () => {
  describe('Successfully renders', () => {
    test('the Posts component.', () => {
      props = {
        getAllPosts: mockGetAllPosts,
        addPost: mockAddPost,
        postState: {
          posts: [
            {
              user: 'test post user2',
              text: 'test post 2',
            },
            {
              user: 'test post user1',
              text: 'test post 1',
            },
          ],
          loading: false,
        },
        authState: {
          isAuthenticated: true,
        },
      };

      wrapper = shallow(<Posts {...props} />);
      expect(wrapper).toMatchSnapshot();
    });

    test('a spinner while length of posts in the Post state is empty.', () => {
      // Set props to render the spinner.
      props = {
        getAllPosts: mockGetAllPosts,
        addPost: mockAddPost,
        postState: {
          posts: [],
          loading: false,
        },
        authState: {
          isAuthenticated: true,
        },
      };

      wrapper = shallow(<Posts {...props} />);

      // Execute the test.
      const spinner = wrapper.find('Spinner');
      expect(spinner.exists()).toBe(true);
    });

    test('a header to prompt the user to join or log in if the user is unauthenticated.', () => {
      // Set props to render the header.
      props = {
        getAllPosts: mockGetAllPosts,
        addPost: mockAddPost,
        postState: {
          posts: [
            {
              user: 'test post user2',
              text: 'test post 2',
            },
            {
              user: 'test post user1',
              text: 'test post 1',
            },
          ],
          loading: false,
        },
        authState: {
          isAuthenticated: false,
        },
      };

      wrapper = shallow(<Posts {...props} />);

      // Execute the test.
      const header = wrapper.find('h4');
      expect(header.exists()).toBe(true);
    });

    test('a list of all posts.', () => {
      props = {
        getAllPosts: mockGetAllPosts,
        addPost: mockAddPost,
        postState: {
          posts: [
            {
              user: 'test post user2',
              text: 'test post 2',
            },
            {
              user: 'test post user1',
              text: 'test post 1',
            },
          ],
          loading: false,
        },
        authState: {
          isAuthenticated: true,
        },
      };

      wrapper = shallow(<Posts {...props} />);

      // Execute the test.
      const postItem = wrapper.find('Connect(PostItem)');
      expect(postItem.exists()).toBe(true);
    });
  });

  describe('If the text box for creating a post renders successfully,', () => {
    beforeEach(() => {
      props = {
        getAllPosts: mockGetAllPosts,
        addPost: mockAddPost,
        postState: {
          posts: [
            {
              user: 'test post user2',
              text: 'test post 2',
            },
            {
              user: 'test post user1',
              text: 'test post 1',
            },
          ],
          loading: false,
        },
        authState: {
          isAuthenticated: true,
        },
      };

      wrapper = shallow(<Posts {...props} />);
    });

    test('the text box updates.', () => {
      wrapper.find('textarea').simulate('change', {
        target: {
          value: 'test post.',
        },
      });

      expect(wrapper.find('textarea').props().value).toBe('test post.');
    });

    test('the default event is prevented when submitted.', () => {
      let eventPrevented = false;
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {
          eventPrevented = true;
        },
      });

      expect(eventPrevented).toBe(true);
    });

    test('the addPost() action is fired when submitted and the user is authenticated.', () => {
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
      });

      expect(mockAddPost).toHaveBeenCalled();
    });
  });
});

test('Calls the getAllPosts() action on render.', () => {
  // Spy on React's useEffect
  let useEffect = jest.spyOn(React, 'useEffect');

  // Redefine the spied on function
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  // Execute the test.
  props = {
    getAllPosts: mockGetAllPosts,
    addPost: mockAddPost,
    postState: {
      posts: [
        {
          user: 'test post user2',
          text: 'test post 2',
        },
        {
          user: 'test post user1',
          text: 'test post 1',
        },
      ],
      loading: false,
    },
    authState: {
      isAuthenticated: true,
    },
  };

  mockUseEffect();
  wrapper = shallow(<Posts {...props} />);
  expect(mockGetAllPosts).toHaveBeenCalled();
});

// test('the setAlert() action is fired when submitted and the user is unauthenticated.', () => {
//   // Set the isAuthenticated property to false
//   props = {
//     getAllPosts: mockGetAllPosts,
//     addPost: mockAddPost,
//     postState: {
//       posts: [
//         {
//           user: 'test post user2',
//           text: 'test post 2',
//         },
//         {
//           user: 'test post user1',
//           text: 'test post 1',
//         },
//       ],
//       loading: false,
//     },
//     authState: {
//       isAuthenticated: false,
//     },
//     setAlert: mockSetAlert,
//   };

//   wrapper = shallow(<Posts {...props} />);

//   wrapper.find('form').simulate('submit', {
//     preventDefault: () => {},
//   });

//   expect(mockSetAlert).toHaveBeenCalled();
// });
