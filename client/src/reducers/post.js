import {
  GET_ALL_POSTS,
  POSTS_ERROR,
  SUBMIT_POST_SUCCESS,
  LIKE_A_POST,
  UNLIKE_A_POST,
  GET_POST,
  COMMENT_ON_POST,
  DELETE_POST,
  DELETE_COMMENT
} from '../actions/types';

const initialState = {
  post: null,
  posts: [],
  //likes: [], *** this would only be one likes array. EACH post needs to have its own like array
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: payload, //the payload is the posts array returned from the backend
        loading: false
      };
    case SUBMIT_POST_SUCCESS:
      return {
        ...state,
        post: payload, // the payload is the post data returned from the backend
        posts: [payload, ...state.posts], // *** update the posts array in the state with the new post
        loading: false
      };
    case LIKE_A_POST:
    case UNLIKE_A_POST:
      return {
        ...state,
        post: {
          // update post state's likes to re-render Comment component
          ...state.post,
          likes: payload.likes
        },
        posts: state.posts.map((
          post // update posts state's likes to re-render Posts component
        ) =>
          post._id === payload.id
            ? {
                ...post,
                likes: payload.likes //payload.likes is the likes array returned from the backend, either with the new like, or removed like
              }
            : post
        ),
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload, //payload is the post returned from the backend
        loading: false
      };
    case COMMENT_ON_POST:
      return {
        ...state,
        post: {
          //update post state's comments to re-render Comment component
          ...state.post,
          comments: payload.comments
        },
        posts: state.posts.map((
          post //update posts state's comments to re-render Posts component
        ) =>
          post._id === payload.id
            ? {
                ...post,
                comments: payload.comments //payload.comments is the comments array returned from the backend
              }
            : post
        ),
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        post: null, //update post state to re-render Comment
        posts: state.posts.filter(post => post._id !== payload.id),
        loading: false
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload.comments
          //need to update state to reflect db and update Comment component
        },
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

// //state.post.comments.filter(
//   comment => comment._id !== payload.id
