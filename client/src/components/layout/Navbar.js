import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const Navbar = ({
  logout,
  authState: { isAuthenticated },
  setAlert,
}) => {
  const handleLogout = (e) => {
    logout();
    setAlert('Logged out succesfully', 'success');
  };

  const authenticatedLinks = (
    <h5>
      <ul>
        <li>
          <Link to='/profiles'>Explorers</Link>
        </li>
        <li>
          <Link to='/posts'>Posts</Link>
        </li>
        <li>
          <a onClick={(e) => handleLogout(e)} href='#!'>
            <i className='fas fa-sign-out-alt' /> <span>Logout</span>
          </a>
        </li>
      </ul>
    </h5>
  );

  const guestLinks = (
    <h5>
      <ul>
        <li>
          <Link to='/profiles'>Explorers</Link>
        </li>
        <li>
          <Link to='/posts'>Posts</Link>
        </li>
      </ul>
    </h5>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-hiking'></i> ExplorersConnect
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authenticatedLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  authState: PropTypes.object.isRequired,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  authState: state.auth,
});

export default connect(mapStateToProps, { logout, setAlert })(Navbar);
