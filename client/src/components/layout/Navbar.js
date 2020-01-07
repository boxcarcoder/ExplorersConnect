import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <a href='index.html'>
          <i className='fas fa-hiking'></i> ExplorersConnect
        </a>
      </h1>
      <h5>
        <ul>
          <li>
            <a href='profiles.html'>Explorers</a>
          </li>
          <li>
            <a href='posts.html'>Posts</a>
          </li>
        </ul>
      </h5>
    </nav>
  );
};

export default Navbar;
