import {
  GET_ALL_POSTS,
  POSTS_ERROR,
  SUBMIT_POST_SUCCESS,
  LIKE_A_POST,
  UNLIKE_A_POST,
  GET_POST
} from '../actions/types';

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case LIKE_A_POST:
    case UNLIKE_A_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id
            ? {
                ...post,
                likes: payload.likes
              }
            : post
        ),
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case POSTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
