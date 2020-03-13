import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

const Discussion = ({ post: { post } }) => {
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
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps)(Discussion);
