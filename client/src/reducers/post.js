import {
    GET_ALL_POSTS,
    POSTS_ERROR,
    SUBMIT_POST_SUCCESS
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
                posts: payload, //the payload is the posts data returned from the backend
                loading: false
              };
        case SUBMIT_POST_SUCCESS:
            return {
                ...state,
                post: payload, // the payload is the post data returned from the backend
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