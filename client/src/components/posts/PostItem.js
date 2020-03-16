import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { likePost, unlikePost } from '../../actions/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';

import { setAlert } from '../../actions/alert';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments },
  postState: { loading },
  likePost,
  authState: { isAuthenticated },
  setAlert,
  unlikePost
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

  // //for async operation. Need to wait for post redux state to be populated before proceeding.
  if (loading) {
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
            <div>
              <Link
                to={`/posts/${_id}`}
                className='btn btn-primary btn-small vert-m-1'
              >
                Discussion
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  postState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postState: state.post,
  authState: state.auth
});

export default connect(mapStateToProps, {
  likePost,
  setAlert,
  unlikePost
})(PostItem);
