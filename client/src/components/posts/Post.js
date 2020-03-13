import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { likePost, unlikePost, commentOnPost } from '../../actions/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';

import { setAlert } from '../../actions/alert';

const Post = ({
  post: { _id, text, name, avatar, user, likes, comments },
  postState: { posts, loading },
  likePost,
  auth: { isAuthenticated },
  setAlert,
  unlikePost,
  commentOnPost
}) => {
  const handleLike = e => {
    if (isAuthenticated) {
      likePost(_id);
    } else {
      setAlert('Please log in to like or dislike post.', 'danger');
    }
  };

  const handleUnlike = e => {
    if (isAuthenticated) {
      unlikePost(_id);
    } else {
      setAlert('Please log in to like or dislike post.', 'danger');
    }
  };

  const handleDiscussion = e => {
    commentOnPost(_id);
  };

  // //for async operation. Need to wait for post redux state to be populated before proceeding.
  if (loading || !posts.length) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <div className='post bg-white vert-m-1 p-1'>
          {/*Poster avatar and name */}
          <div>
            <Link to={`/profile/${user}`}>
              <img className='round-img' src={avatar} alt='avatar' />
              <h4>{name}</h4>
            </Link>
          </div>
          {/*Thumbs up, down, and comment */}
          <div>
            <p className='vert-m-1'>{text}</p>
            <button className='btn' onClick={e => handleLike(e)}>
              <i className='fas fa-thumbs-up'></i> <span>{likes.length}</span>
            </button>
            <button className='btn' onClick={e => handleUnlike(e)}>
              <i className='fas fa-thumbs-down'></i>
            </button>
            <Link
              to={`/posts/${_id}`}
              className='btn btn-primary'
              onClick={e => handleDiscussion(e)}
            >
              Discussion
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  commentOnPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  postState: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, {
  likePost,
  setAlert,
  unlikePost,
  commentOnPost
})(Post);
