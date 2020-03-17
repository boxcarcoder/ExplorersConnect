import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const CommentItem = ({ comment: { user, avatar, name, text } }) => {
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
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null)(CommentItem);
