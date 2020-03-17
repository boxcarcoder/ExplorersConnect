import {
  GET_ALL_POSTS,
  POSTS_ERROR,
  LIKE_A_POST,
  UNLIKE_A_POST,
  GET_POST
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// Get all posts.
export const getAllPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_ALL_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Like a post
export const likePost = id => async dispatch => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: LIKE_A_POST,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Unlike a post
export const unlikePost = id => async dispatch => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UNLIKE_A_POST,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Fetch a post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
