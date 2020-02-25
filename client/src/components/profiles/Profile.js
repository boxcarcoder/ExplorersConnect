import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';

const Profile = ({
  //profile state
  profile: {
    //a field within the profile state
    profile: {
      user: { name, avatar } //this field countains a user field, which contains name and avatar
    }
  },
  getCurrentProfile
}) => {
  //when a user's profile page is first loaded, retrieve the profile and store it in the profile redux state
  useEffect(() => {
    getCurrentProfile();
  }, []);

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
          <p>Seattle, WA</p>
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
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Voluptatibus cum asperiores, suscipit dolorum ad perspiciatis
            numquam vitae porro ipsa, nisi explicabo, alias debitis molestias
            aut veritatis unde. Ea, repellendus? Quae!
          </p>

          <div className='line'></div>
          <h2 className='text-primary'>Passions</h2>
          <div className='passions'>
            <div className='p-1'>
              <i className='fas fa-campground'></i> Camping
            </div>
            <div className='p-1'>
              <i className='fas fa-hiking'></i> Hiking
            </div>
          </div>
        </div>
        {/* Destinations */}
        <div className='bg-light p-2 profile-location'>
          <h2 className='text-primary'>Explored</h2>
          <p>
            <strong>Hiking</strong>
            <ul>
              <li>Chantry Flats</li>
              <li>Top Of The World</li>
              <li>Lower Moro Trail</li>
            </ul>
          </p>
          <div className='line'></div>
          <p>
            <strong>Camping</strong>
            <ul>
              <li>Dry Lake</li>
              <li>Spruce Grove</li>
              <li>Cooper Canyon</li>
            </ul>
          </p>
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
  //state.profile is the profile state containing profile, profiles,loading, error.
  //state.profile.profile is the profile field in the profile state.
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
