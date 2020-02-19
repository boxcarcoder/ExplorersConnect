import React, { useState, Fragment, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom'; // to redirect from actions using history.push

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  history,
  getCurrentProfile
}) => {
  //create state for form data that requires user input
  const [formData, setFormData] = useState({
    Hiking: false,
    Camping: false,
    Kayaking: false,
    Rafting: false,
    Skiing: false,
    Snowboarding: false,
    Rockclimbing: false,
    Other: false,
    faveRecreation: '',
    website: '',
    bio: '',
    location: '',
    twitter: '',
    facebook: '',
    youtube: '',
    instagram: ''
  });

  const {
    Hiking,
    Camping,
    Kayaking,
    Rafting,
    Skiing,
    Snowboarding,
    Rockclimbing,
    Other,
    faveRecreation,
    website,
    bio,
    location,
    twitter,
    facebook,
    youtube,
    instagram
  } = formData;

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  // run getCurrentProfile to fetch profile data for the state
  useEffect(() => {
    getCurrentProfile();
    console.log('profile data during first load: ', profile);

    // prefill the form data with the current profile values (from getCurrentProfile)
    setFormData({
      Hiking: loading || !profile.Hiking ? false : profile.Hiking,
      Camping: loading || !profile.Camping ? false : profile.Camping,
      Kayaking: loading || !profile.Kayaking ? false : profile.Kayaking,
      Rafting: loading || !profile.Rafting ? false : profile.Rafting,
      Skiing: loading || !profile.Skiing ? false : profile.Skiing,
      Snowboarding:
        loading || !profile.Snowboarding ? false : profile.Snowboarding,
      Rockclimbing:
        loading || !profile.Rockclimbing ? false : profile.Rockclimbing,
      Other: loading || !profile.Other ? false : profile.Other,
      faveRecreation:
        loading || !profile.faveRecreation ? '' : profile.faveRecreation,
      website: loading || !profile.website ? '' : profile.website,
      bio: loading || !profile.bio ? '' : profile.bio,
      location: loading || !profile.location ? '' : profile.location,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    });
  }, [loading]);

  // e.target.name is the name of the input
  // e.target.value is the user input
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // e.target.checked is the user clicking the check box
  const onClick = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
    });
  };

  // when the form is submitted, fire the createProfile action
  const handleSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
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
            onClick={e => onClick(e)}
          />{' '}
          Hiking
          <br />
          <input
            type='checkbox'
            name='Camping'
            checked={Camping}
            onClick={e => onClick(e)}
          />{' '}
          Camping
          <br />
          <input
            type='checkbox'
            name='Kayaking'
            checked={Kayaking}
            onClick={e => onClick(e)}
          />{' '}
          Kayaking
          <br />
          <input
            type='checkbox'
            name='Rafting'
            checked={Rafting}
            onClick={e => onClick(e)}
          />{' '}
          Rafting
          <br />
          <input
            type='checkbox'
            name='Skiing'
            checked={Skiing}
            onClick={e => onClick(e)}
          />{' '}
          Skiing
          <br />
          <input
            type='checkbox'
            name='Snowboarding'
            checked={Snowboarding}
            onClick={e => onClick(e)}
          />{' '}
          Snowboarding
          <br />
          <input
            type='checkbox'
            name='Rockclimbing'
            checked={Rockclimbing}
            onClick={e => onClick(e)}
          />{' '}
          Rockclimbing
          <br />
          <input type='checkbox' name='Other' checked={Other} /> Other
          <br />
        </div>

        {/* Favorite recreation dropdown */}
        <small className='form-text'>Which is your favorite recreation?</small>
        <div className='form-group'>
          <select
            name='faveRecreation'
            value={faveRecreation}
            onChange={e => onChange(e)}
          >
            <option value='0'>* Favorite Outdoor Recreation</option>
            <option value='HikingFave'>Hiking</option>
            <option value='CampingFave'>Camping</option>
            <option value='KayakingFave'>Kayaking</option>
            <option value='RaftingFave'>Rafting</option>
            <option value='SkiingFave'>Skiing</option>
            <option value='SnowboardingFave'>Snowboarding</option>
            <option value='RockClimbingFave'>Rock Climbing</option>
            <option value='OtherFave'>Other</option>
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
            onChange={e => onChange(e)}
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
            onChange={e => onChange(e)}
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
            onChange={e => onChange(e)}
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
                onChange={e => onChange(e)}
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
                onChange={e => onChange(e)}
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
                onChange={e => onChange(e)}
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
                onChange={e => onChange(e)}
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
