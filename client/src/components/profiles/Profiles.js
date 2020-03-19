import React, { Fragment, useEffect } from 'react';
import ProfileItem from './ProfileItem';

//redux
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import PropTypes from 'prop-types';

const Profiles = ({ getAllProfiles, profileState: { profiles } }) => {
  //on the Profiles page's first load, retrieve all profiles and save it into the profile redux state
  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <Fragment>
      <h1 className='large text-primary'>Explorers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i> Browse and connect with
        explorers
      </p>
      <div className='profiles'>
        {profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ))}
      </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profileState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profileState: state.profile
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
