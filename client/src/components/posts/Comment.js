import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
//import CommentItem from './CommentItem';

const Comment = ({ postState: { post, loading }, getPost, match }) => {
  //when comment component first loads, load redux state with post data
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  console.log('Comment re-rendering.');

  if (!post) {
    return <h1> no post Comment </h1>;
  } else {
    return (
      <Fragment>
        <PostItem key={post._id} post={post} />
      </Fragment>
    );
  }
};

Comment.propTypes = {
  postState: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  postState: state.post
});

export default connect(mapStateToProps, {
  getPost
})(Comment);
