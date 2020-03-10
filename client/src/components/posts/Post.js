import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

/*need to get profile id for each post. need post component for each post*/
const Post = ({ post }) => {
  const { text, name, avatar, user, likes, comments } = post;

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
          <button className='btn'>
            <i className='fas fa-thumbs-up'></i> <span>4</span>
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
};

export default Post;
