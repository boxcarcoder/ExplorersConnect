import React from 'react';
import { Link, Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const Landing = ({ authState: { isAuthenticated } }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='large'>Explorers Connect</h1>
          <p className='lead'>
            Create an explorer profile to share your gear and favorite
            adventures.
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Register
            </Link>
            <Link to='/login' className='btn btn'>
              Login
            </Link>
          </div>
        </div>
      </div>
      <a
        style={{
          backgroundColor: 'black',
          color: 'white',
          textDecoration: 'none',
          padding: '4px 6px',
          fontFamily:
            '-apple-system , BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Ubuntu, Roboto, Noto, "Segoe UI", Arial, sans-serif ',
          fontSize: '8px',
          fontWeight: 'bold',
          lineHeight: '1',
          display: 'inline-block',
          borderRadius: '3px',
        }}
        href='https://unsplash.com/@wanderingteddybear?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge'
        target='_blank'
        rel='noopener noreferrer'
        title='High-resolution photos from Ted Bryan Yu on Unsplash'
        className='credit-box-abs'
      >
        <span
          style={{
            display: 'inline-block',
            padding: '2px 3px',
            fontSize: '11px',
          }}
        >
          <i className='fas fa-camera-retro'></i>
        </span>
        <span style={{ display: 'inline-block', padding: '2px 3px' }}>
          Ted Bryan Yu
        </span>
      </a>
    </section>
  );
};

Landing.propTypes = {
  authState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.auth,
});

export default connect(mapStateToProps)(Landing);
