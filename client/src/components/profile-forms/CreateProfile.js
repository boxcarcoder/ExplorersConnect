import React, { useState, Fragment } from 'react';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateProfile = () => {
  //create state for form data that requires user input
  const [formData, setFormData] = useState({
    website: '',
    bio: '',
    location: '',
    twitter: '',
    facebook: '',
    youtube: '',
    instagram: ''
  });

  const {
    website,
    bio,
    location,
    twitter,
    facebook,
    youtube,
    instagram
  } = formData;

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's personalize your profile.
      </p>
      <div className='line'></div>
      <form className='form'>
        <p className='lead'>Outdoor Recreations</p>
        <small className='form-text'>
          What outdoor recreations do you enjoy?
        </small>
        <div className='form-group'>
          <input type='checkbox' value='Hiking' /> Hiking
          <br />
          <input type='checkbox' value='Camping' /> Camping
          <br />
          <input type='checkbox' value='Kayaking' /> Kayaking
          <br />
          <input type='checkbox' value='Rafting' /> Rafting
          <br />
          <input type='checkbox' value='Skiing' /> Skiing
          <br />
          <input type='checkbox' value='Snowboarding' /> Snowboarding
          <br />
          <input type='checkbox' value='Rockclimbing' /> Kayaking
          <br />
          <input type='checkbox' value='Rafting' /> Other
          <br />
        </div>
        <small className='form-text'>Which is your favorite recreation?</small>
        <div className='form-group'>
          <select name='status'>
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
          <input type='text' placeholder='Personal Website' name='website' />
          <small className='form-text'>
            Have a blog for adventures or gear reviews?
          </small>
        </div>
        <div className='form-group'>
          <textarea placeholder='A short bio of yourself' name='bio'></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='* Location' name='location' />
          <small className='form-text'>
            City & state (eg. Los Angeles, CA)
          </small>
        </div>

        <div className='my-2'>
          <button type='button' className='btn'>
            Add Social Network Links
          </button>
          <small>Optional</small>
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-twitter fa-2x'></i>
          <input type='text' placeholder='Twitter URL' name='twitter' />
        </div>
        <div className='form-group social-input'>
          <i className='fab fa-facebook fa-2x'></i>
          <input type='text' placeholder='Facebook URL' name='facebook' />
        </div>
        <div className='form-group social-input'>
          <i className='fab fa-youtube fa-2x'></i>
          <input type='text' placeholder='YouTube URL' name='youtube' />
        </div>
        <div className='form-group social-input'>
          <i className='fab fa-instagram fa-2x'></i>
          <input type='text' placeholder='Instagram URL' name='instagram' />
        </div>

        <small>* = required fields</small>
        <div className='vert-m-1'>
          <input type='submit' className='btn btn-primary my-1' />
          <a className='btn btn-light my-1' href='dashboard.html'>
            Go Back
          </a>
        </div>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(CreateProfile);
