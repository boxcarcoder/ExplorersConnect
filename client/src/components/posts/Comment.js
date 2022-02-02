import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { getPost, commentOnPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import PostItem from './PostItem';
import CommentItem from './CommentItem';
import { Link, Redirect } from 'react-router-dom';

export const Comment = ({
  postState: { post, loading, deletedPost },
  getPost,
  match, //match is an object passed by React within the default props. The object contains route params.
  commentOnPost,
  authState: { isAuthenticated },
  setAlert,
}) => {
  //when comment component first loads, load post redux state with post data
  React.useEffect(() => {
    getPost(match.params.id);
  }, [match.params.id]);

  const [formData, setFormData] = useState({
    text: '',
  });
  const { text } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      commentOnPost(match.params.id, formData);
      window.scrollTo(0, 0);
      setAlert('Commented successfully.', 'success');
      setFormData({
        text: '',
      });
    } else {
      window.scrollTo(0, 0);
      setAlert('Please log in to comment on post.', 'danger');
    }
  };

  const onChange = (e) => {
    setFormData({
      text: e.target.value,
    });
  };

  // case 1: when getPost has not populated the post redux state yet
  if (loading || (!post && !deletedPost)) {
    return <Spinner />;
  }
  // case 2: when a post is deleted
  else if (!post && deletedPost) {
    return <Redirect to='/posts' />;
  }
  // case 3: when getPost has populated the post redux state.
  else {
    return (
      <Fragment>
        {/* Go Back to Posts Button */}
        <Link to={'/posts'} className='btn'>
          Go Back
        </Link>

        {/*Posts's avatar, name, and text */}
        <PostItem key={post._id} post={post} showCommentBtn={false} />

        {/*Comment input box */}
        <div className='post-form' onSubmit={(e) => handleSubmit(e)}>
          <div className='bg-primary post-form-header '>
            <h4>Leave a Comment</h4>
          </div>
          <form className='form vert-m-1'>
            <textarea
              cols='30'
              rows='5'
              placeholder='Comment on this post'
              value={text}
              onChange={(e) => onChange(e)}
            ></textarea>
            <input
              type='submit'
              value='Submit'
              className='btn btn-dark vert-m-1'
            />
          </form>

          {/* Comments list section */}
          <div className='comments'>
            {post.comments
              ? post.comments.map((comment) => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    postId={post._id}
                  />
                ))
              : null}
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
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  postState: state.post,
  authState: state.auth,
});

export default connect(mapStateToProps, {
  getPost,
  commentOnPost,
  setAlert,
})(Comment);
