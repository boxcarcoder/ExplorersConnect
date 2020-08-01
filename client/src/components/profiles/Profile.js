import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';

import Spinner from '../layout/Spinner';

const Profile = ({
  profileState: { profile, loading },
  getProfileById,
  match,
}) => {
  //when a user's profile page is first loaded, retrieve the profile and store it in the profile redux state
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  //for async operation. need to wait for profile to be loaded into the profile redux state before proceeding
  if (profile === null || loading) {
    return (
      <Fragment>
        <Spinner />
      </Fragment>
    );
  }

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
    gears,
    social,
  } = profile;

  // ======== Check for favorite activities ========
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
          <i className='fas fa-water'></i> Kayaking
        </div>
      );
    }
  };

  const checkRaft = () => {
    if (Rafting) {
      return (
        <div className='p-1'>
          <i className='fas fa-tint'></i> Rafting
        </div>
      );
    }
  };

  const checkSki = () => {
    if (Skiing) {
      return (
        <div className='p-1'>
          <i className='fas fa-skiing'></i> Skiing
        </div>
      );
    }
  };

  const checkSnowboard = () => {
    if (Snowboarding) {
      return (
        <div className='p-1'>
          <i className='fas fa-snowboarding'></i> Snowboarding
        </div>
      );
    }
  };

  const checkRockclimb = () => {
    if (Rockclimbing) {
      return (
        <div className='p-1'>
          <i className='fas fa-mountain'></i> Rockclimbing
        </div>
      );
    }
  };

  // ======== Check for favorite destinations for each activity ========
  const checkHikeDestinations = () => {
    if (Hiking) {
      return (
        <Fragment>
          <p>
            <strong>Hike Trails</strong>
            <ul>
              {destinations.map((destination) => (
                <li>{destination.hikingTrails}</li>
              ))}
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
              {destinations.map((destination) => (
                <li>{destination.campSites}</li>
              ))}
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
              {destinations.map((destination) => (
                <li>{destination.waterAreas}</li>
              ))}
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
              {destinations.map((destination) => (
                <li>{destination.slopes}</li>
              ))}
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
              {destinations.map((destination) => (
                <li>{destination.crags}</li>
              ))}
            </ul>
          </p>
          <div className='line'></div>
        </Fragment>
      );
    }
  };

  // ======== Check for favorite gears for each activity ========
  const checkHikeGears = () => {
    if (Hiking) {
      return (
        <Fragment>
          <p>
            <strong>Hiking</strong>
            <ul>
              {gears.map((gear) => (
                <li>{gear.hikeGear}</li>
              ))}
            </ul>
          </p>
          <div className='line'></div>
        </Fragment>
      );
    }
  };

  const checkCampGears = () => {
    if (Camping) {
      return (
        <Fragment>
          <p>
            <strong>Camping</strong>
            <ul>
              {gears.map((gear) => (
                <li>{gear.campGear}</li>
              ))}
            </ul>
          </p>
          <div className='line'></div>
        </Fragment>
      );
    }
  };

  const checkWaterGears = () => {
    if (Kayaking || Rafting) {
      return (
        <Fragment>
          <p>
            <strong>Lakes, Rivers, or Oceans</strong>
            <ul>
              {gears.map((gear) => (
                <li>{gear.waterGear}</li>
              ))}
            </ul>
          </p>
          <div className='line'></div>
        </Fragment>
      );
    }
  };

  const checkSnowGears = () => {
    if (Skiing || Snowboarding) {
      return (
        <Fragment>
          <p>
            <strong>Slopes</strong>
            <ul>
              {gears.map((gear) => (
                <li>{gear.snowGear}</li>
              ))}
            </ul>
          </p>
          <div className='line'></div>
        </Fragment>
      );
    }
  };

  const checkClimbGears = () => {
    if (Rockclimbing) {
      return (
        <Fragment>
          <p>
            <strong>Rock Climbing</strong>
            <ul>
              {gears.map((gear) => (
                <li>{gear.rockClimbingGear}</li>
              ))}
            </ul>
          </p>
          <div className='line'></div>
        </Fragment>
      );
    }
  };

  // ======== Check for provided social media links ========
  const checkInstagram = () => {
    if (!social || !social.instagram) {
      return (
        <div className='invalid-icon'>
          <i className='fab fa-instagram fa-2x'></i>
        </div>
      );
    } else if (social.instagram) {
      return (
        <div className='valid-icon'>
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        </div>
      );
    }
  };

  const checkTwitter = () => {
    if (!social || !social.twitter) {
      return (
        <div className='invalid-icon'>
          <i className='fab fa-twitter fa-2x'></i>
        </div>
      );
    } else if (social.twitter) {
      return (
        <div className='valid-icon'>
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x'></i>
          </a>
        </div>
      );
    }
  };

  const checkFacebook = () => {
    if (!social || !social.facebook) {
      return (
        <div className='invalid-icon'>
          <i className='fab fa-facebook fa-2x'></i>
        </div>
      );
    } else if (social.facebook) {
      return (
        <div className='valid-icon'>
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        </div>
      );
    }
  };

  const checkYoutube = () => {
    if (!social || !social.youtube) {
      return (
        <div className='invalid-icon'>
          <i className='fab fa-youtube fa-2x'></i>
        </div>
      );
    } else if (social.youtube) {
      return (
        <div className='valid-icon'>
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        </div>
      );
    }
  };

  const checkSocialMedia = () => {
    return (
      <Fragment>
        <div className='vert-m-1 icons-list'>
          {checkInstagram()}
          {checkTwitter()}
          {checkFacebook()}
          {checkYoutube()}
        </div>
      </Fragment>
    );
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
          {checkSocialMedia()}
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
          {checkHikeGears()}
          {checkCampGears()}
          {checkWaterGears()}
          {checkSnowGears()}
          {checkClimbGears()}
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  profileState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profileState: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
