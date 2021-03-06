import React, { useState, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom'; // withRouter: to get access to the history object's properties

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

export const CreateProfile = ({ createProfile, history }) => {
  // The history object is passed by React within the default props. We are destructuring props.history.

  // user inputs must have corresponding states
  const [formData, setFormData] = useState({
    Hiking: false,
    Camping: false,
    Kayaking: false,
    Rafting: false,
    Skiing: false,
    Snowboarding: false,
    Rockclimbing: false,
    faveRecreation: '',
    website: '',
    bio: '',
    location: '',
    twitter: '',
    facebook: '',
    youtube: '',
    instagram: '',
  });

  const {
    Hiking,
    Camping,
    Kayaking,
    Rafting,
    Skiing,
    Snowboarding,
    Rockclimbing,
    faveRecreation,
    website,
    bio,
    location,
    twitter,
    facebook,
    youtube,
    instagram,
  } = formData;

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  // e.target.name is the name of the input
  // e.target.value is the user input
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // e.target.checked is the user clicking the check box
  const handleClick = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  // when the form is submitted, fire the createProfile action
  const handleSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, false);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's personalize your profile.
      </p>

      <div className='line'></div>

      <form className='form' onSubmit={handleSubmit}>
        {/* Check box list */}
        <p className='lead'>Outdoor Recreations</p>
        <small className='form-text'>
          What outdoor recreations do you enjoy?
        </small>
        <div className='form-group'>
          <input
            type='checkbox'
            name='Hiking'
            checked={Hiking}
            onChange={(e) => handleClick(e)}
          />{' '}
          Hiking
          <br />
          <input
            type='checkbox'
            name='Camping'
            checked={Camping}
            onChange={(e) => handleClick(e)}
          />{' '}
          Camping
          <br />
          <input
            type='checkbox'
            name='Kayaking'
            checked={Kayaking}
            onChange={(e) => handleClick(e)}
          />{' '}
          Kayaking
          <br />
          <input
            type='checkbox'
            name='Rafting'
            checked={Rafting}
            onChange={(e) => handleClick(e)}
          />{' '}
          Rafting
          <br />
          <input
            type='checkbox'
            name='Skiing'
            checked={Skiing}
            onChange={(e) => handleClick(e)}
          />{' '}
          Skiing
          <br />
          <input
            type='checkbox'
            name='Snowboarding'
            checked={Snowboarding}
            onChange={(e) => handleClick(e)}
          />{' '}
          Snowboarding
          <br />
          <input
            type='checkbox'
            name='Rockclimbing'
            checked={Rockclimbing}
            onChange={(e) => handleClick(e)}
          />{' '}
          Rock Climbing
          <br />
        </div>

        {/* Favorite recreation dropdown */}
        <small className='form-text'>Which is your favorite recreation?</small>
        <div className='form-group'>
          <select
            name='faveRecreation'
            value={faveRecreation}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Favorite Outdoor Recreation</option>
            <option value='HikingFave'>Hiking</option>
            <option value='CampingFave'>Camping</option>
            <option value='KayakingFave'>Kayaking</option>
            <option value='RaftingFave'>Rafting</option>
            <option value='SkiingFave'>Skiing</option>
            <option value='SnowboardingFave'>Snowboarding</option>
            <option value='RockClimbingFave'>Rock Climbing</option>
          </select>
        </div>

        <div className='line'></div>

        <p className='lead'>Bio</p>
        <div className='form-group'>
          {/* Personal Website */}
          <input
            type='text'
            placeholder='Personal Website'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Have a blog for adventures or gear reviews?
          </small>
        </div>

        <div className='form-group'>
          {/* Bio */}
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='form-group'>
          {/* Location */}
          <input
            type='text'
            placeholder='* Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            City & state (eg. Los Angeles, CA)
          </small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn'
          >
            Add Social Network Links
          </button>
          <small>Optional</small>
        </div>

        {displaySocialInputs ? (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              {/* Twitter Link */}
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              {/* Facebook Link */}
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              {/* Youtube Link */}
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              {/* Instagram Link */}
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        ) : null}

        <small>* = required fields</small>
        <div className='vert-m-1'>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </div>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
