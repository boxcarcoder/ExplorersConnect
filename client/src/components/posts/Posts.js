import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/post';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

const Posts = ({ getAllPosts, postState: { posts, loading } }) => {
  //on initial load, populate post redux state with all posts
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const allPosts = () => {
    return posts.map(post => <PostItem key={post._id} post={post} />);
  };

  //need to wait for posts to be loaded into the post redux state before proceeding
  if (!posts.length || loading) {
    return <h1> still loading </h1>;
  } else {
    return (
      <Fragment>
        <h1>Posts</h1>
        <p>Welcome to the community</p>
        <div>{allPosts()}</div>
      </Fragment>
    );
  }
};

Posts.propTypes = {
  postState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postState: state.post
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
