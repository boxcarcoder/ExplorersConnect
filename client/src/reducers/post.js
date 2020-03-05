import {
    GET_ALL_POSTS,
    POSTS_ERROR
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
                posts: payload, //the payload is the profile data returned from the backend
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