import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getAllPosts, addPost } from '../../actions/post';

import PropTypes from 'prop-types';

const Posts = ({ getAllPosts, addPost, post: { posts } }) => {
  //on initial load, populate post redux state with all posts
  useEffect(() => {
    getAllPosts();
  }, []);

  // create state to handle input
  const [formData, setFormData] = useState();

  // const { postBox } = formData;

  const handleSubmit = e => {
    console.log('submitting post: ', formData);
    e.preventDefault();
    addPost(formData);
  };

  const onChange = e => {
    console.log('setting formdata in post component.');
    setFormData({
      [e.target.name]: e.target.value
    });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community
      </p>

      <div className='post-form'>
        <div className='bg-primary post-form-header '>
          <h4>Start a Discussion</h4>
        </div>

        <form className='form vert-m-1' onSubmit={handleSubmit}>
          <textarea
            cols='30'
            rows='5'
            placeholder='Create a post'
            onChange={e => onChange(e)}
          ></textarea>
          <input
            type='submit'
            className='btn btn-primary vert-m-1'
            value='Submit'
          />
        </form>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getAllPosts, addPost })(Posts);
