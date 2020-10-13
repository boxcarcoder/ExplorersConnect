import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import { getAllPosts, addPost } from '../../actions/post';

export const Posts = ({
  getAllPosts,
  addPost,
  postState: { posts, loading },
  authState: { isAuthenticated },
}) => {
  //on initial load, populate post redux state with all posts
  React.useEffect(() => {
    getAllPosts();
  });

  // create state to handle input
  const [formData, setFormData] = useState({
    text: '',
  });

  const { text } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();

    addPost(formData);
    setFormData({
      text: '',
    });
  };

  const onChange = (e) => {
    setFormData({
      text: e.target.value,
    });
  };

  const allPosts = () => {
    return posts.map((post) => (
      <PostItem key={post._id} post={post} showCommentBtn={true} />
    ));
  };

  const displayCommentBox = () => {
    if (!isAuthenticated) {
      return (
        <Fragment>
          <div className='bg-primary post-form-header '>
            <h4>Join or log in to start a discussion!</h4>
          </div>
        </Fragment>
      );
    }
    return (
      <Fragment>
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
              value={text}
              onChange={(e) => onChange(e)}
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

  //need to wait for posts to be loaded into the post redux state before proceeding
  if (!posts.length || loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <h1 className='large text-primary'>Posts</h1>

        {displayCommentBox()}
        {/*List of Posts*/}
        <div className='posts'>{allPosts()}</div>
      </Fragment>
    );
  }
};

Posts.propTypes = {
  postState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  postState: state.post,
  authState: state.auth,
});

export default connect(mapStateToProps, { getAllPosts, addPost })(Posts);
