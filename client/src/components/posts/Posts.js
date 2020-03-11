import React, { Fragment, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getAllPosts, addPost } from '../../actions/post';

import PropTypes from 'prop-types';

import Post from './Post';

import Spinner from '../layout/Spinner';

const Posts = ({ getAllPosts, addPost, post: { posts, loading } }) => {
  //on initial load, populate post redux state with all posts
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  // create state to handle input
  const [formData, setFormData] = useState('');

  const handleSubmit = e => {
    console.log('submitting post: ', formData);
    e.preventDefault();
    addPost(formData);
    setFormData('');
  };

  const onChange = e => {
    // console.log('[e.target.name]', [e.target.name]);
    // console.log('e.target.value', e.target.value);
    setFormData({
      [e.target.name]: e.target.value
    });
  };

  const allPosts = () => {
    console.log('all posts: ', posts);
    return posts.map(post => <Post key={post._id} post={post}/>);
  };

  //need to wait for posts to be loaded into the post redux state before proceeding
  if (!posts.length || loading) {
    return (
      <Fragment>
        <Spinner />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <h1 className='large text-primary'>Posts</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Welcome to the community
        </p>
        {/* Post Box and Submit Button */}
        <div className='post-form'>
          <div className='bg-primary post-form-header '>
            <h4>Start a Discussion</h4>
          </div>

          <form className='form vert-m-1' onSubmit={handleSubmit}>
            <textarea
              cols='30'
              rows='5'
              placeholder='Create a post'
              name='text'
              onChange={e => onChange(e)}
            ></textarea>
            <input
              type='submit'
              className='btn btn-primary vert-m-1'
              value='Submit'
            />
          </form>
        </div>
        {/*List of Posts*/}
        <div className='posts'>{allPosts()}</div>
      </Fragment>
    );
  }
};

Posts.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getAllPosts, addPost })(Posts);
