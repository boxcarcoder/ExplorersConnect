import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ logout, authState: { isAuthenticated, loading } }) => {
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
          <a onClick={logout} href='#!'>
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
      {!loading ? (
        <Fragment>{isAuthenticated ? authenticatedLinks : guestLinks}</Fragment>
      ) : null}
    </nav>
  );
};

Navbar.propTypes = {
  authState: PropTypes.object.isRequired,
  logout: PropTypes.func
};

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
