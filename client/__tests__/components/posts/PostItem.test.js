import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { PostItem } from '../../../src/components/posts/PostItem';

// Globals for testing
let props;
let wrapper;
let mockLikePost = jest.fn();
let mockUnlikePost = jest.fn();
let mockDeletePost = jest.fn();
let mockSetAlert = jest.fn();

describe('<PostItem /> component.', () => {
  describe('Successfully renders', () => {
    test('the PostItem component.', () => {
      props = {
        post: {
          _id: 'test post id',
          text: 'test post name',
          avatar: 'test post avatar',
          user: 'test post user',
          likes: 'test post likes',
          comments: 'test post comments',
          date: 'test post date',
        },
        postState: {
          loading: false,
        },
        likePost: mockLikePost,
        authState: {
          isAuthenticated: true,
          loggedInUser: {
            _id: 'test logged in user id',
            name: 'test logged in user name',
            email: 'test logged in user email',
            password: 'test logged in user password',
          },
        },
        setAlert: mockSetAlert,
        unlikePost: mockUnlikePost,
        showCommentBtn: true,
        deletePost: mockDeletePost,
      };

      wrapper = shallow(<PostItem {...props} />);
      expect(wrapper).toMatchSnapshot();
    });

    test('a spinner while the loading property in the Post state is true.', () => {
      // Set the props so that the loading property is true in the Post state
      props = {
        post: {
          _id: 'test post id',
          text: 'test post name',
          avatar: 'test post avatar',
          user: 'test post user',
          likes: 'test post likes',
          comments: 'test post comments',
          date: 'test post date',
        },
        postState: {
          loading: true,
        },
        likePost: mockLikePost,
        authState: {
          isAuthenticated: true,
          loggedInUser: {
            _id: 'test logged in user id',
            name: 'test logged in user name',
            email: 'test logged in user email',
            password: 'test logged in user password',
          },
        },
        setAlert: mockSetAlert,
        unlikePost: mockUnlikePost,
        showCommentBtn: false,
        deletePost: mockDeletePost,
      };

      wrapper = shallow(<PostItem {...props} />);

      //Execute the test
      const spinner = wrapper.find('Spinner');
      expect(spinner.exists()).toBe(true);
    });
  });

  describe('If the PostItem is rendered,', () => {
    beforeEach(() => {
      props = {
        post: {
          _id: 'test post id',
          text: 'test post name',
          avatar: 'test post avatar',
          user: 'test post user',
          likes: 'test post likes',
          comments: 'test post comments',
          date: 'test post date',
        },
        postState: {
          loading: false,
        },
        likePost: mockLikePost,
        authState: {
          isAuthenticated: true,
          loggedInUser: {
            _id: 'test logged in user id',
            name: 'test logged in user name',
            email: 'test logged in user email',
            password: 'test logged in user password',
          },
        },
        setAlert: mockSetAlert,
        unlikePost: mockUnlikePost,
        showCommentBtn: false,
        deletePost: mockDeletePost,
      };

      wrapper = shallow(<PostItem {...props} />);
    });

    test('it renders a link to the user profile of the post.', () => {
      const link = wrapper.find('Link').at(0);
      expect(link.props().to).toBe('/profile/test post user');
    });

    test('it renders a button to fire the likePost() action.', () => {
      const button = wrapper.find('button').at(0);
      expect(button.exists()).toBe(true);
    });

    test('it renders a button to fire the unlikePost() action.', () => {
      const button = wrapper.find('button').at(1);
      expect(button.exists()).toBe(true);
    });
  });

  describe('If PostItem is on the posts page,', () => {
    beforeEach(() => {
      props = {
        post: {
          _id: 'test post id',
          text: 'test post name',
          avatar: 'test post avatar',
          user: 'test post user',
          likes: 'test post likes',
          comments: 'test post comments',
          date: 'test post date',
        },
        postState: {
          loading: false,
        },
        likePost: mockLikePost,
        authState: {
          isAuthenticated: true,
          loggedInUser: {
            _id: 'test logged in user id',
            name: 'test logged in user name',
            email: 'test logged in user email',
            password: 'test logged in user password',
          },
        },
        setAlert: mockSetAlert,
        unlikePost: mockUnlikePost,
        showCommentBtn: true,
        deletePost: mockDeletePost,
      };

      wrapper = shallow(<PostItem {...props} />);
    });

    test('it renders a link to the comments of the post.', () => {
      const link = wrapper.find('Link').at(1);
      expect(link.props().to).toBe('/posts/test post id');
    });
  });

  describe('If the user is authenticated', () => {
    beforeEach(() => {
      props = {
        post: {
          _id: 'test post id',
          text: 'test post name',
          avatar: 'test post avatar',
          user: 'test logged in user id',
          likes: 'test post likes',
          comments: 'test post comments',
          date: 'test post date',
        },
        postState: {
          loading: false,
        },
        likePost: mockLikePost,
        authState: {
          isAuthenticated: true,
          loggedInUser: {
            _id: 'test logged in user id',
            name: 'test logged in user name',
            email: 'test logged in user email',
            password: 'test logged in user password',
          },
        },
        setAlert: mockSetAlert,
        unlikePost: mockUnlikePost,
        showCommentBtn: true,
        deletePost: mockDeletePost,
      };

      wrapper = shallow(<PostItem {...props} />);
    });

    test('clicking the like button fires the likePost() action.', () => {
      const button = wrapper.find('button').at(0);
      button.simulate('click');
      expect(mockLikePost).toHaveBeenCalled();
    });

    test('clicking the unlike button fires the unlikePost() action.', () => {
      const button = wrapper.find('button').at(1);
      button.simulate('click');
      expect(mockUnlikePost).toHaveBeenCalled();
    });

    test('clicking the delete button fires the deletePost() action.', () => {
      const button = wrapper.find('button').at(2);
      button.simulate('click');
      expect(mockDeletePost).toHaveBeenCalled();
    });
  });

  describe('If the user is not authenticated', () => {
    beforeEach(() => {
      props = {
        post: {
          _id: 'test post id',
          text: 'test post name',
          avatar: 'test post avatar',
          user: 'test post user',
          likes: 'test post likes',
          comments: 'test post comments',
          date: 'test post date',
        },
        postState: {
          loading: false,
        },
        likePost: mockLikePost,
        authState: {
          isAuthenticated: false,
          loggedInUser: {},
        },
        setAlert: mockSetAlert,
        unlikePost: mockUnlikePost,
        showCommentBtn: true,
        deletePost: mockDeletePost,
      };

      wrapper = shallow(<PostItem {...props} />);
    });

    test('clicking the like button fires the setAlert() action.', () => {
      const button = wrapper.find('button').at(0);
      button.simulate('click');
      expect(mockSetAlert).toHaveBeenCalled();
    });

    test('clicking the unlike button fires the setAlert() action.', () => {
      const button = wrapper.find('button').at(1);
      button.simulate('click');
      expect(mockSetAlert).toHaveBeenCalled();
    });
  });
});
