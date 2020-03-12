import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { likePost } from '../../actions/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';


const Post = ({ post: {_id, text, name, avatar, user, likes, comments }, postState: { posts, loading }, likePost }) => {

  const handleClick = e => {
    // console.log('id for action and backend: ', _id);
    likePost(_id);
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
            <button className='btn' onClick={e => handleClick(e)}>
              <i className='fas fa-thumbs-up'></i> <span>{likes.length}</span>
            </button>
            <button className='btn'>
              <i className='fas fa-thumbs-down'></i>
            </button>
            <Link to='/post' className='btn btn-primary'>
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
};

const mapStateToProps = state => ({
  postState: state.post
});

export default connect(mapStateToProps, {likePost})(Post);
