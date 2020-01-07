import React from 'react';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='large'>Explorers Connect</h1>
          <p className='lead'>
            Create an explorer profile to share your gear, passions, and
            favorite adventures.
          </p>
          <div className='buttons'>
            <a href='register.html' className='btn btn-primary'>
              Register
            </a>
            <a href='login.html' className='btn btn'>
              Login
            </a>
          </div>
        </div>
      </div>
      {/* <a
        style={{background-color:'black';color:'white';text-decoration:'none';padding:'4px 6px';font-family:'-apple-system , BlinkMacSystemFont, \"San Francisco\", \"Helvetica Neue\", Helvetica, Ubuntu, Roboto, Noto, \"Segoe UI\", Arial, sans-serif ';font-size:'8px';font-weight:'bold';line-height:'1';display:'inline-block';border-radius:'3px'}}
        href='https://unsplash.com/@wanderingteddybear?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge'
        target='_blank'
        rel='noopener noreferrer'
        title='High-resolution photos from Ted Bryan Yu on Unsplash'
        className='credit-box-abs'
      >
        <span style='display:inline-block;padding:2px 3px;font-size:11px'>
          <i className='fas fa-camera-retro'></i>
        </span>
        <span style='display:inline-block;padding:2px 3px'>Ted Bryan Yu</span>
      </a> */}
    </section>
  );
};

export default Landing;
