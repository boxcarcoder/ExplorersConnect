import React, { Fragment } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardButtons from './DashboardButtons';
import Destinations from './Destinations';
import Gears from './Gears';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

export const Dashboard = ({
  getCurrentProfile,
  profileState: { profile, loading },
}) => {
  //on the dashboard's first load, retrieve the logged in user's profile and save it into the profile redux state
  React.useEffect(() => {
    getCurrentProfile();
  }, []); //*** */

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        {/*check if the logged in user has a profile*/}
        {profile !== null ? (
          <Fragment>
            <h1 className='large text-primary'>Dashboard</h1>
            <p>
              <i className='fas fa-user'></i>Welcome {profile.user.name}
            </p>
            <DashboardButtons />
            <Destinations destinations={profile.destinations} />
            <Gears gears={profile.gears} />
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
  profileState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profileState: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
