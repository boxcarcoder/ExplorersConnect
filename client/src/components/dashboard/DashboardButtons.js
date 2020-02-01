import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DashboardButtons = () => {
  return (
    <Fragment>
      <div className='buttons vert-m-1'>
        <Link to='/edit-profile' className='btn'>
          <i className='fas fa-user-circle text-primary'></i> Edit profile
        </Link>
        <Link to='/add-destination' className='btn'>
          <i className='fas fa-map-signs text-primary'></i> Add Destinations
        </Link>
        <Link to='/add-gear' className='btn'>
          <i className='fas fa-snowboarding text-primary'></i> Add Gear
        </Link>
      </div>
    </Fragment>
  );
};

export default DashboardButtons;
