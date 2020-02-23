import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    Camping,
    Kayaking,
    Rafting,
    Skiing,
    Snowboarding,
    Rockclimbing,
    Other,
    location,
    bio
  }
}) => {
  console.log('user being sent from Profiles: ', name);

  return (
    <Fragment>
      <div className='profile bg-light'>
        <img className='round-img' src={avatar} alt='hiker' />
        <div>
          <h2>{name}</h2>
          <p>{location}</p>
          <p>{bio}</p>
          <Link to='/profile' className='btn btn-primary'>
            View Profile
          </Link>
        </div>
        <ul>
          <li className='text-primary'>
            <i className='fas fa-check'></i> Camping
          </li>
          <li className='text-primary'>
            <i className='fas fa-check'></i> Hiking
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

ProfileItem.propType = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
