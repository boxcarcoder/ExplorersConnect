import React, { Fragment } from 'react';

//redux
import { PropTypes } from 'prop-types';

const Destinations = ({ destinations }) => {
  // Use the profile.destinations state (from Dashboard component) for destinations data.
  const allDestinations = destinations.map(destination => (
    <tr key={destination._id}>
      <td>{destination.hikingTrails}</td>
      <td>{destination.campSites}</td>
      <td>{destination.waterAreas}</td>
      <td>{destination.slopes}</td>
      <td>{destination.crags}</td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='vert-m-1'>Explored Destinations</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Hiking</th>
            <th>Camping</th>
            <th>Water Sports</th>
            <th>Snow Sports</th>
            <th>Rock Climbing</th>
          </tr>
        </thead>
        <tbody>
          {allDestinations}
          <tr>
            <td>
              <button className='btn btn-danger'>Delete</button>
            </td>
            <td>
              <button className='btn btn-danger'>Delete</button>
            </td>
            <td>
              <button className='btn btn-danger'>Delete</button>
            </td>
            <td>
              <button className='btn btn-danger'>Delete</button>
            </td>
            <td>
              <button className='btn btn-danger'>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

Destinations.propTypes = {
  destinations: PropTypes.array.isRequired
};

export default Destinations;
