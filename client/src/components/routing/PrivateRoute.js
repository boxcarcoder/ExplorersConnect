import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  authState: { isAuthenticated, loading },
  ...rest //any custom props that are passed in
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  authState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
