import React from 'react';
import { shallow } from 'enzyme';

// Import the non-connected component
import { CommentItem } from '../../../src/components/posts/CommentItem';

// Globals for testing
let props;
let wrapper;
let mockDeleteComment = jest.fn();

describe('<CommentItem /> component.', () => {
  beforeEach(() => {
    props = {
      comment: {
        _id: 'test comment id',
        user: 'test comment user',
        avatar: 'test comment avatar',
        name: 'test comment name',
        text: 'test comment text.',
        date: 'test comment date',
      },
      authState: {
        isAuthenticated: false,
        loggedInUser: {},
      },
      deleteComment: mockDeleteComment,
      postId: 'test post id',
    };

    wrapper = shallow(<CommentItem {...props} />);
  });

  test('Successfully renders.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('contains a link to the profile of the commenter.', () => {
    const link = wrapper.find('Link');

    // test user comment is the ${user} used by the CommentItem component.
    expect(link.props().to).toBe('/profile/test comment user');
  });

  test('If the user is authenticated, the delete comment button is rendered.', () => {
    // Set the props so that the user is authenticated.
    props = {
      comment: {
        _id: 'test comment id',
        user: 'test logged in user id',
        avatar: 'test comment avatar',
        name: 'test comment name',
        text: 'test comment text.',
        date: 'test comment date',
      },
      authState: {
        isAuthenticated: true,
        loggedInUser: {
          _id: 'test logged in user id',
          name: 'test logged in user name',
          email: 'test logged in user email',
          password: 'test logged in user password',
        },
      },
      deleteComment: mockDeleteComment,
      postId: 'test post id',
    };

    wrapper = shallow(<CommentItem {...props} />);
    console.log(wrapper.debug({ verbose: true }));

    // Execute the test.
    const button = wrapper.find('button');
    button.simulate('click');
    expect(mockDeleteComment).toHaveBeenCalled();
  });
});
