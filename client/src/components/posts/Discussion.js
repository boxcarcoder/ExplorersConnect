import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import {
  getPost,
  commentOnPost,
  likePost,
  unlikePost
} from '../../actions/post';

import Spinner from '../layout/Spinner';

import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';

const Discussion = ({
  post: { post, loading },
  getPost,
  match,
  commentOnPost,
  likePost,
  unlikePost,
  auth: { isAuthenticated },
  setAlert
}) => {
  //when discussion component first loads, load redux state with post data
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  const [formData, setFormData] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (isAuthenticated) {
      console.log('commenting on post. ');
      commentOnPost(match.params.id, formData);
      setAlert('Commented successfully.', 'success');
    } else {
      console.log('pls log in.');
      setAlert('Please log in to comment on post.', 'danger');
    }
  };

  const onChange = e => {
    setFormData({
      [e.target.name]: e.target.value
    });
  };

  const handleLike = e => {
    if (isAuthenticated) {
      likePost(match.params.id);
    } else {
      setAlert('Please log in comment on a post.', 'danger');
    }
  };

  const handleUnlike = e => {
    if (isAuthenticated) {
      unlikePost(match.params.id);
    } else {
      setAlert('Please log in to like or dislike post.', 'danger');
    }
  };

  if (!post || loading) {
    return <Spinner />;
  } else {
    const { user, avatar, name, text, likes, comments } = post;

    return (
      <Fragment>
        {/*Posts's avatar, name, and text */}
        <div className='post bg-white vert-m-1 p-1'>
          {/*Poster avatar and name */}
          <div>
            <Link to={`/profile/${user}`}>
              <img className='round-img' src={avatar} alt='avatar' />
              <h4>{name}</h4>
            </Link>
          </div>
          {/* Post */}
          <div>
            <p className='vert-m-1'>{text}</p>
            <button className='btn' onClick={e => handleLike(e)}>
              <i className='fas fa-thumbs-up'></i> <span>{likes.length}</span>
            </button>
            <button className='btn' onClick={e => handleUnlike(e)}>
              <i className='fas fa-thumbs-down'></i>
            </button>
            <div>
              <Link to='/posts' className='btn btn-primary vert-m-1 btn-small '>
                Go Back
              </Link>
            </div>
          </div>
        </div>

        {/*Comment input box */}
        <div className='post-form' onSubmit={e => handleSubmit(e)}>
          <div className='bg-primary post-form-header '>
            <h4>Leave a Comment</h4>
          </div>
          <form className='form vert-m-1'>
            <textarea
              cols='30'
              rows='5'
              placeholder='Comment on this post'
              name='text'
              onChange={e => onChange(e)}
            ></textarea>
            <input
              type='submit'
              value='Submit'
              className='btn btn-dark vert-m-1'
            />
          </form>
        </div>
      </Fragment>
    );
  }
};

Discussion.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  commentOnPost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getPost,
  commentOnPost,
  likePost,
  unlikePost,
  setAlert
})(Discussion);
