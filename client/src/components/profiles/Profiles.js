import React, { Fragment } from 'react';
import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';

//redux
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import PropTypes from 'prop-types';

export const Profiles = ({
  getAllProfiles,
  profileState: { profiles, loading },
}) => {
  //on the Profiles page's first load, retrieve all profiles and save it into the profile redux state
  React.useEffect(() => {
    getAllProfiles();
  }, []); //*** */

  if (!profiles.length || loading) {
    console.log('profiles state not loaded yet');
    return <Spinner />;
  } else {
    console.log('profiles loaded: ', profiles);
    return (
      <Fragment>
        <h1 className='large text-primary'>Explorers</h1>
        <p className='lead'>
          <i className='fab fa-connectdevelop'></i> Browse and connect with
          explorers
        </p>
        <div className='profiles'>
          {profiles.map((profile) => {
            if (profile.user !== null) {
              return <ProfileItem key={profile._id} profile={profile} />;
            }
          })}
        </div>
      </Fragment>
    );
  }
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profileState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profileState: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
