import {
    GET_ALL_POSTS,
    POSTS_ERROR
  } from './types';
  import axios from 'axios';

  // Get all posts.
export const getAllPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_ALL_POSTS,
            payload: res.data
        })

    } catch (err) {
        // dispatch error message and HTTP error status to the post redux state
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}