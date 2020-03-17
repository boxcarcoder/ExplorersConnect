import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

const Comment = ({ postState: { post, loading }, getPost, match }) => {
  //when comment component first loads, load redux state with post data
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  if (!post || loading) {
    return <h1> still loading </h1>;
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
