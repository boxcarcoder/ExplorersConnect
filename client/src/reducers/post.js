import {
  GET_ALL_POSTS,
  POSTS_ERROR,
  SUBMIT_POST_SUCCESS,
  LIKE_A_POST
} from '../actions/types';

const initialState = {
  post: null,
  posts: [],
  likes: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: payload, //the payload is the posts data returned from the backend
        loading: false
      };
    case SUBMIT_POST_SUCCESS:
      return {
        ...state,
        post: payload, // the payload is the post data returned from the backend
        loading: false
      };
    case LIKE_A_POST:
      return {
          ...state,
          likes: payload, // the payload is the likes array of the post returned from the backend
          loading: false
        }
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
