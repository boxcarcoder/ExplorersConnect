import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { likePost, unlikePost } from '../../actions/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PostItem = ({
  post: { _id, likes },
  postState: { posts, loading },
  likePost,
  unlikePost
}) => {
  const handleLike = e => {
    likePost(_id);
  };

  const handleUnlike = e => {
    unlikePost(_id);
  };

  console.log('re-rendering');

  if (loading || !posts.length) {
    return <h1> still loading </h1>;
  } else {
    return (
      <Fragment>
        <div>
          <p>post</p>
          <div>
            <button className='btn' onClick={e => handleLike(e)}>
              <i className='fas fa-thumbs-up'></i> <span>{likes.length}</span>
            </button>
            <button className='btn' onClick={e => handleUnlike(e)}>
              <i className='fas fa-thumbs-down'></i>
            </button>
            <div>
              <Link to={`/posts/${_id}`}>Comment</Link>
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
  unlikePost: PropTypes.func.isRequired,
  postState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postState: state.post
});

export default connect(mapStateToProps, {
  likePost,
  unlikePost
})(PostItem);
