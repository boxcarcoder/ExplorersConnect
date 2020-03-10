import {
  GET_ALL_POSTS,
  POSTS_ERROR,
  SUBMIT_POST_SUCCESS,
  LIKE_A_POST
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

// Get all posts.
export const getAllPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_ALL_POSTS,
      payload: res.data
    });
  } catch (err) {
    // dispatch error message and HTTP error status to the post redux state
    console.log('error getting all posts: ', err);
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add a post.
export const addPost = formData => async dispatch => {
  try {
    //set the token as the header to gain access to the protected route POST /api/posts
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // configuration of the HTTP request to the backend
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log('attempting to place post into db.');
    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: SUBMIT_POST_SUCCESS,
      payload: res.data
    });

    // display an alert to notify the user of what they just did
    dispatch(setAlert('Posted successfully.', 'success'));
  } catch (err) {
    console.log('error posting.');

    // dispatch error message and HTTP error status to the post redux state
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Like a post
export const likePost = id => async dispatch => {
  console.log('reached backend.');
  try {
    //set the token as the header to gain access to the protected route POST /api/posts/like
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.put(`/like/${id}`);

    console.log('LIKE A POST: ', res);
    // dispatch({
    //   type: LIKE_A_POST,
    //   payload: res.data
    // });
  } catch (err) {
    console.log('error liking.');

    // dispatch error message and HTTP error status to the post redux state
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
