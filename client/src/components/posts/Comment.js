import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPost, commentOnPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import PostItem from './PostItem';
import CommentItem from './CommentItem';
import { Link, Redirect } from 'react-router-dom';

const Comment = ({
  postState: { post, loading },
  getPost,
  match,
  commentOnPost,
  authState: { isAuthenticated },
  setAlert
}) => {
  //when comment component first loads, load redux state with post data
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  const [formData, setFormData] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (isAuthenticated) {
      commentOnPost(match.params.id, formData);
      setAlert('Commented successfully.', 'success');
    } else {
      setAlert('Please log in to comment on post.', 'danger');
    }
  };

  const onChange = e => {
    setFormData({
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <Spinner />;
  } else if (!post) {
    //once a post is deleted from PostItem, redirect to posts page since the psot is deleted.
    return <Redirect to='/posts' />;
  } else {
    return (
      <Fragment>
        {/* Go Back to Posts Button */}
        <Link to={'/posts'} className='btn'>
          Go Back
        </Link>

        {/*Posts's avatar, name, and text */}
        <PostItem key={post._id} post={post} showCommentBtn={false} />

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

          {/* Comments list section */}
          <div className='comments'>
            {post.comments.map(comment => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
};

Comment.propTypes = {
  postState: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  commentOnPost: PropTypes.func.isRequired,
  authState: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  postState: state.post,
  authState: state.auth
});

export default connect(mapStateToProps, {
  getPost,
  commentOnPost,
  setAlert
})(Comment);
