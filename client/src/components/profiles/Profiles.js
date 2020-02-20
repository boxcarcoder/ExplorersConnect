import React, { Fragment } from 'react';
import hikerPic from '../../img/luke-pamer-KBpnPk44tOA-unsplash.jpg';
import snowboardPic from '../../img/joshua-reddekopp-9BpTTLoTv9w-unsplash.jpg';

const Profiles = () => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Explorers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i> Browse and connect with
        explorers
      </p>
      <div className='profiles'>
        <div className='profile bg-light'>
          <img className='round-img' src={hikerPic} alt='hiker' />

          <div>
            <h2>John Doe</h2>
            <p>Seattle, WA</p>
            <a href='profile.html' className='btn btn-primary'>
              View Profile
            </a>
          </div>

          <ul>
            <li className='text-primary'>
              <i className='fas fa-check'></i> Camping
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'></i> Hiking
            </li>
          </ul>
        </div>

        <div className='profile bg-light'>
          <img className='round-img' src={snowboardPic} alt='snowboarder' />

          <div>
            <h2>Jane Doe</h2>
            <p>Denver, CO</p>
            <a href='profile.html' className='btn btn-primary'>
              View Profile
            </a>
          </div>

          <ul>
            <li className='text-primary'>
              <i className='fas fa-check'></i> Hiking
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'></i> Kayaking
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'></i> Snowboarding
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Profiles;
