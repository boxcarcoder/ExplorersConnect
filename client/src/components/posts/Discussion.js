import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getPost, commentOnPost } from '../../actions/post';

import Spinner from '../layout/Spinner';

import PropTypes from 'prop-types';

const Discussion = ({
  post: { post, loading },
  getPost,
  match,
  commentOnPost
}) => {
  //when discussion component first loads, load redux state with post data
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  const [formData, setFormData] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('commenting on post. ');
    commentOnPost(match.params.id, formData);
  };

  const onChange = e => {
    setFormData({
      [e.target.name]: e.target.value
    });
  };

  if (!post || loading) {
    return <Spinner />;
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
          {/* Comment */}
          <div>
            <p className='vert-m-1'>{text}</p>
            <Link to='/posts' className='btn btn-primary'>
              Go Back
            </Link>
          </div>
        </div>

        {/*Comment input box */}
        <div className='post-form'  onSubmit={e => handleSubmit(e)}>
          <div className='bg-primary post-form-header '>
            <h4>Leave a Comment</h4>
          </div>
          <form className='form vert-m-1'>
            <textarea
              cols='30'
              rows='5'
              placeholder='Comment on this post'
              name='text'
              onChange={e => onChange(e)}
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

Discussion.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  commentOnPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost, commentOnPost })(Discussion);
