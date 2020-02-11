// Fetch all relevant data using actions, bring them in from the redux state,
// and pass them down to components, such as Destinations and Gears

import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardButtons from './DashboardButtons';
import Destinations from './Destinations';
import Gear from './Gear';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  //on the dashboard's first load, retrieve the logged in user's profile and save it into the profile redux state
  useEffect(() => {
    getCurrentProfile();
  }, []);

  if (loading && profile === null) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p>
          <i className='fas fa-user'></i>Welcome {user && user.name}
        </p>

        {/*check if the logged in user has a profile*/}
        {profile !== null ? (
          <Fragment>
            <DashboardButtons />
            <Destinations destinations={profile.destinations} />
            {/*profile from mapStateToProps */}
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not set up a profile yet!</p>
            <Link to='/create-profile' className='btn btn-primary vert-m-1'>
              Create Profile
            </Link>
          </Fragment>
        )}
      </Fragment>
    );
  }
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
