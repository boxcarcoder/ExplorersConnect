import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    Hiking,
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

  const checkHike = () => {
    if (Hiking) {
      return (
        <li className='text-primary'>
          <i className='fas fa-check'></i> Hiking
        </li>
      );
    }
  };

  const checkCamp = () => {
    if (Camping) {
      return (
        <li className='text-primary'>
          <i className='fas fa-check'></i> Camping
        </li>
      );
    }
  };

  const checkKayak = () => {
    if (Kayaking) {
      return (
        <li className='text-primary'>
          <i className='fas fa-check'></i> Kayaking
        </li>
      );
    }
  };

  const checkRaft = () => {
    if (Rafting) {
      return (
        <li className='text-primary'>
          <i className='fas fa-check'></i> Rafting
        </li>
      );
    }
  };

  const checkSki = () => {
    if (Skiing) {
      return (
        <li className='text-primary'>
          <i className='fas fa-check'></i> Skiing
        </li>
      );
    }
  };

  const checkSnowboard = () => {
    if (Snowboarding) {
      return (
        <li className='text-primary'>
          <i className='fas fa-check'></i> Snowboarding
        </li>
      );
    }
  };

  const checkRockclimb = () => {
    if (Rockclimbing) {
      return (
        <li className='text-primary'>
          <i className='fas fa-check'></i> Rockclimbing
        </li>
      );
    }
  };

  return (
    <Fragment>
      <div className='profile bg-light'>
        <img className='round-img' src={avatar} alt='hiker' />
        <div className='m-3'>
          <h2>{name}</h2>
          <p>{location}</p>
          <p>{bio}</p>
          <Link to='/profile' className='btn btn-primary'>
            View Profile
          </Link>
        </div>
        <ul>
          {checkHike()}
          {checkCamp()}
          {checkKayak()}
          {checkRaft()}
          {checkSki()}
          {checkSnowboard()}
          {checkRockclimb()}
        </ul>
      </div>
    </Fragment>
  );
};

ProfileItem.propType = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
