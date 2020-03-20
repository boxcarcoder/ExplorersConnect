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
    location,
    bio,
    faveRecreation
  }
}) => {
  const checkHike = () => {
    if (Hiking) {
      if (faveRecreation === 'HikingFave') {
        return (
          <li className='text-primary'>
            <i class='fas fa-heart'></i> Hiking
          </li>
        );
      } else {
        return (
          <li className='text-primary'>
            <i className='fas fa-check'></i> Hiking
          </li>
        );
      }
    }
  };

  const checkCamp = () => {
    if (Camping) {
      if (faveRecreation === 'CampingFave') {
        return (
          <li className='text-primary'>
            <i class='fas fa-heart'></i> Camping
          </li>
        );
      } else {
        return (
          <li className='text-primary'>
            <i className='fas fa-check'></i> Camping
          </li>
        );
      }
    }
  };

  const checkKayak = () => {
    if (Kayaking) {
      if (faveRecreation === 'KayakingFave') {
        return (
          <li className='text-primary'>
            <i class='fas fa-heart'></i> Kayaking
          </li>
        );
      } else {
        return (
          <li className='text-primary'>
            <i className='fas fa-check'></i> Kayaking
          </li>
        );
      }
    }
  };

  const checkRaft = () => {
    if (Rafting) {
      if (faveRecreation === 'RaftingFave') {
        return (
          <li className='text-primary'>
            <i class='fas fa-heart'></i> Rafting
          </li>
        );
      } else {
        return (
          <li className='text-primary'>
            <i className='fas fa-check'></i> Rafting
          </li>
        );
      }
    }
  };

  const checkSki = () => {
    if (Skiing) {
      if (faveRecreation === 'SkiingFave') {
        return (
          <li className='text-primary'>
            <i class='fas fa-heart'></i> Skiing
          </li>
        );
      } else {
        return (
          <li className='text-primary'>
            <i className='fas fa-check'></i> Skiing
          </li>
        );
      }
    }
  };

  const checkSnowboard = () => {
    if (Snowboarding) {
      if (faveRecreation === 'SnowboardingFave') {
        return (
          <li className='text-primary'>
            <i class='fas fa-heart'></i> Snowboarding
          </li>
        );
      } else {
        return (
          <li className='text-primary'>
            <i className='fas fa-check'></i> Snowboarding
          </li>
        );
      }
    }
  };

  const checkRockclimb = () => {
    if (Rockclimbing) {
      if (faveRecreation === 'RockClimbingFave') {
        return (
          <li className='text-primary'>
            <i class='fas fa-heart'></i> Rock Climbing
          </li>
        );
      } else {
        return (
          <li className='text-primary'>
            <i className='fas fa-check'></i> Rock Climbing
          </li>
        );
      }
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
          <Link to={`/profile/${_id}`} className='btn btn-primary'>
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
