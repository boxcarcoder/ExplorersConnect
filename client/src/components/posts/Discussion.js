import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getPost } from '../../actions/post';

const Discussion = ({ post: { post }, getPost, match }) => {
  //when discussion component first loads, load redux state with post data
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  if (!post) {
    return (
      <Fragment>
        <h1>post redux state's post prop has not been populated yet.</h1>
      </Fragment>
    );
  } else {
    const { user, avatar, name, text } = post;

    return (
      <Fragment>
        {/*Posts's avatar, name, and text */}
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
            <Link to='/posts' className='btn btn-primary'>
              Go Back
            </Link>
          </div>
        </div>

        {/*Comment input box */}
        <div className='post-form'>
          <div className='bg-primary post-form-header '>
            <h4>Leave a Comment</h4>
          </div>
          <form className='form vert-m-1'>
            <textarea
              cols='30'
              rows='5'
              placeholder='Comment on this post'
            ></textarea>
            <input
              type='submit'
              value='Submit'
              className='btn btn-dark vert-m-1'
            />
          </form>
        </div>
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Discussion);
