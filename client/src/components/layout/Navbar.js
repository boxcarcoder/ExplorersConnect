import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-hiking'></i> ExplorersConnect
        </Link>
      </h1>
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
    </nav>
  );
};

export default Navbar;
