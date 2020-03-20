import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import PropTypes from 'prop-types';

const CommentItem = ({
  comment: { _id, user, avatar, name, text },
  authState: { isAuthenticated, loggedInUser },
  deleteComment,
  postId
}) => {
  const handleDeleteComment = e => {
    deleteComment(postId, _id);
  };

  const displayDeleteBtn = () => {
    if (isAuthenticated && loggedInUser._id === user) {
      return (
        <button
          className='btn btn-danger btn-small vert-m-1'
          onClick={e => handleDeleteComment(e)}
        >
          x
        </button>
      );
    }
  };

  return (
    <Fragment>
      <div className='post bg-white vert-m-1 p-1'>
        <div>
          <Link to={`/profile/${user}`}>
            <img className='round-img' src={avatar} alt='avatar' />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className='vert-m-1'>{text}</p>
          <div>{displayDeleteBtn()}</div>
        </div>
      </div>
    </Fragment>
  );
};

CommentItem.propTypes = {
  authState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
