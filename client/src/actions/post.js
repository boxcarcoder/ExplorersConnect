import {
  GET_ALL_POSTS,
  POSTS_ERROR,
  CREATE_POST,
  LIKE_A_POST,
  UNLIKE_A_POST,
  GET_POST,
  COMMENT_ON_POST,
  DELETE_POST,
  DELETE_COMMENT,
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

// Get all posts.
export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_ALL_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err },
    });
  }
};

// Add a post.
export const addPost = (formData) => async (dispatch) => {
  try {
    //set the token as the header to gain access to the protected route POST /api/posts
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // configuration of the HTTP request to the backend
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });

    // display an alert to notify the user of what they just did
    dispatch(setAlert('Posted successfully.', 'success'));
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err },
    });
  }
};

// Like a post
export const likePost = (id) => async (dispatch) => {
  try {
    //set the token as the header to gain access to the protected route POST /api/posts/like
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: LIKE_A_POST,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err },
    });
  }
};

// Unlike a post
export const unlikePost = (id) => async (dispatch) => {
  try {
    //set the token as the header to gain access to the protected route POST /api/posts/like
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UNLIKE_A_POST,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err },
    });
  }
};

// Fetch a post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err },
    });
  }
};

// Comment on a post
export const commentOnPost = (id, formData) => async (dispatch) => {
  try {
    //set the token as the header to gain access to the protected route POST /api/posts
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // configuration of the HTTP request to the backend
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(`/api/posts/comment/${id}`, formData, config);

    dispatch({
      type: COMMENT_ON_POST,
      payload: { id, comments: res.data },
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err },
    });
  }
};

// Delete a post
export const deletePost = (id) => async (dispatch) => {
  try {
    //set the token as the header to gain access to the protected route POST /api/posts
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: { id },
    });

    return res; //*** */
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err },
    });
  }
};

// Delete a comment
export const deleteComment = (postId, id) => async (dispatch) => {
  try {
    //set the token as the header to gain access to the protected route POST /api/posts
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.delete(`/api/posts/comment/${postId}/${id}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: { id, comments: res.data },
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err },
    });
  }
};
