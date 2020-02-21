import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//import snowboardPic from '../../img/joshua-reddekopp-9BpTTLoTv9w-unsplash.jpg';
import hikerPic from '../../img/luke-pamer-KBpnPk44tOA-unsplash.jpg';

const ProfileItem = ( { profiles }) => {
    console.log('profiles from Profiles component: ', profiles)

    //must break down profiles into each index and populate JSX with each index's properties
    const allProfiles = profiles.map(profile => (  

    ));

    /*
    {profile._id}
    {profile.Camping}
    {profile.Kayaking}
    {profile.Rafting}
    {profile.Skiing}
    {profile.Snowboarding}
    {profile.Rockclimbing}
    {profile.Other} */

    return ( 
        <Fragment> 
            <div className='profile bg-light'>
            
            <img className='round-img' src={hikerPic} alt='hiker' />
            <div>
                <h2>John Doe</h2>
                <p>Seattle, WA</p>
                <Link to='/profile' className='btn btn-primary'>
                View Profile
                </Link>
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
    
        </Fragment>
    );
};

export default ProfileItem;