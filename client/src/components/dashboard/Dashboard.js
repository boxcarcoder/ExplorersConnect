// Fetch all relevant data using actions, bring them in from the redux state,
// and pass them down to components, such as Destinations and Gears 

import React, { useEffect } from 'react';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';



const Dashboard = ({ getCurrentProfile, auth, profile }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []); //on the dashboard's first load, retrieve the logged in user's profile and save it into the profile redux state

    return (
        <div>
            Dashboard
        </div>
    );
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired    
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);