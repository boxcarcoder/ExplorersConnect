import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';

const Profile = ({ profile: { profile }, getProfileById, match }) => {
  //when a user's profile page is first loaded, retrieve the profile and store it in the profile redux state
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  const {
    user: { name, avatar }, //this field countains a user field, which contains name and avatar
    bio,
    location,
    Hiking,
    Camping,
    Kayaking,
    Rafting,
    Skiing,
    Snowboarding,
    Rockclimbing,
    destinations,
    gears
  } = profile;

  console.log('destinations: ', destinations); //an array with each index being a set of all locations.
  console.log('gears: ', gears);

  // check for favorite activities
  const checkHike = () => {
    if (Hiking) {
      return (
        <div className='p-1'>
          <i className='fas fa-campground'></i> Camping
        </div>
      );
    }
  };

  const checkCamp = () => {
    if (Camping) {
      return (
        <div className='p-1'>
          <i className='fas fa-hiking'></i> Hiking
        </div>
      );
    }
  };

  const checkKayak = () => {
    if (Kayaking) {
      return (
        <div className='p-1'>
          <i class='fas fa-water'></i> Kayaking
        </div>
      );
    }
  };

  const checkRaft = () => {
    if (Rafting) {
      return (
        <div className='p-1'>
          <i class='fas fa-tint'></i> Rafting
        </div>
      );
    }
  };

  const checkSki = () => {
    if (Skiing) {
      return (
        <div className='p-1'>
          <i class='fas fa-skiing'></i> Skiing
        </div>
      );
    }
  };

  const checkSnowboard = () => {
    if (Snowboarding) {
      return (
        <div className='p-1'>
          <i class='fas fa-snowboarding'></i> Snowboarding
        </div>
      );
    }
  };

  const checkRockclimb = () => {
    if (Rockclimbing) {
      return (
        <div className='p-1'>
          <i class='fas fa-mountain'></i> Snowboarding
        </div>
      );
    }
  };

  //check for favorite destinations for each activity
  const checkHikeDestinations = () => {
    if (Hiking) {
      return (
        <Fragment>
          <p>
            <strong>Hike Trails</strong>
            <ul>
              {destinations.map(destination =>
                destination.hikingTrails.map(hikingTrail => (
                  <li>{hikingTrail}</li>
                ))
              )}
            </ul>
          </p>
          <div className='line'></div>
        </Fragment>
      );
    }
  };

  const checkCampDestinations = () => {
    if (Camping) {
      return (
        <Fragment>
          <p>
            <strong>Campsites</strong>
            <ul>
              {destinations.map(destination =>
                destination.campSites.map(campSite => <li>{campSite}</li>)
              )}
            </ul>
          </p>
          <div className='line'></div>
        </Fragment>
      );
    }
  };

  const checkWaterDestinations = () => {
    if (Kayaking || Rafting) {
      return (
        <Fragment>
          <p>
            <strong>Lakes, Rivers, or Oceans</strong>
            <ul>
              {destinations.map(destination =>
                destination.waterAreas.map(waterArea => <li>{waterArea}</li>)
              )}
            </ul>
          </p>
          <div className='line'></div>
        </Fragment>
      );
    }
  };

  const checkSnowDestinations = () => {
    if (Skiing || Snowboarding) {
      return (
        <Fragment>
          <p>
            <strong>Slopes</strong>
            <ul>
              {destinations.map(destination =>
                destination.slopes.map(slope => <li>{slope}</li>)
              )}
            </ul>
          </p>
          <div className='line'></div>
        </Fragment>
      );
    }
  };

  const checkClimbDestinations = () => {
    if (Rockclimbing) {
      return (
        <Fragment>
          <p>
            <strong>Crags</strong>
            <ul>
              {destinations.map(destination =>
                destination.crags.map(crag => <li>{crag}</li>)
              )}
            </ul>
          </p>
          <div className='line'></div>
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      <Link to='/profiles' className='btn'>
        Back to Profiles
      </Link>
      <div className='vert-m-1 profile-grid'>
        {/* Top */}
        <div className='bg-primary p-2 profile-top'>
          <img className='curved-img vert-m-1' src={avatar} alt='profilePic' />

          <h1 className='large'>{name}</h1>
          <p>{location}</p>
          <div className='vert-m-1 icons'>
            <Link to='#'>
              <i className='fab fa-instagram fa-2x'></i>
            </Link>
            <Link to='#'>
              <i className='fab fa-twitter fa-2x '></i>
            </Link>
            <Link to='#'>
              <i className='fab fa-facebook fa-2x'></i>
            </Link>
            <Link to='#'>
              <i className='fab fa-youtube fa-2x'></i>
            </Link>
          </div>
        </div>

        {/* Bio and Passions */}
        <div className='bg-light p-2 profile-about'>
          <h2 className='text-primary'>Bio</h2>
          <p>{bio}</p>

          <div className='line'></div>
          <h2 className='text-primary'>Passions</h2>
          <div className='passions'>
            {checkHike()}
            {checkCamp()}
            {checkKayak()}
            {checkRaft()}
            {checkSki()}
            {checkSnowboard()}
            {checkRockclimb()}
          </div>
        </div>

        {/* Destinations */}
        <div className='bg-light p-2 profile-location'>
          <h2 className='text-primary'>Explored</h2>
          {checkHikeDestinations()}
          {checkCampDestinations()}
          {checkWaterDestinations()}
          {checkSnowDestinations()}
          {checkClimbDestinations()}
        </div>

        {/* Gears */}
        <div className='bg-light p-2 profile-gear'>
          <h2 className='text-primary'>Gear</h2>
          <p>
            <strong>Hiking</strong>
            <ul>
              <li>Black Diamond Distance Z</li>
              <li>Salomon Odyssey Pro shoes</li>
              <li>Smartwool Socks</li>
            </ul>
          </p>
          <div className='line'></div>
          <p>
            <strong>Camping</strong>
            <ul>
              <li>Mountain Hardware Pinole 20</li>
              <li>Aegismax M2</li>
              <li>NatureHike CloudUp 2</li>
              <li>Thermarest Prolite Plus</li>
              <li>Soto Amicus Stove</li>
            </ul>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  //state.profile is the profile state containing profile, profiles, loading, error.
  //state.profile.profile is the profile field in the profile state.
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(Profile);
