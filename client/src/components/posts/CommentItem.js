import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CommentItem = ({ comment: { user, avatar, name, text } }) => {
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
        </div>
      </div>
    </Fragment>
  );
};

CommentItem.propType = {
  postState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postState: state.post
});

export default connect(mapStateToProps)(CommentItem);
