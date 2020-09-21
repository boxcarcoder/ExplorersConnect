import React, { Fragment } from 'react';

//redux
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { deleteDestinations } from '../../actions/profile';

// Use the profile.destinations state (from Dashboard component) for destinations data.
export const Destinations = ({ destinations, deleteDestinations }) => {
  const allDestinations = destinations.map((destination) => (
    <tr key={destination._id}>
      <td>{destination.hikingTrails}</td>
      <td>{destination.campSites}</td>
      <td>{destination.waterAreas}</td>
      <td>{destination.slopes}</td>
      <td>{destination.crags}</td>
      <td>
        <button
          onClick={() => deleteDestinations(destination._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
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
            <th>Remove?</th>
          </tr>
        </thead>
        <tbody>{allDestinations}</tbody>
      </table>
    </Fragment>
  );
};

Destinations.propTypes = {
  destinations: PropTypes.array.isRequired,
  deleteDestinations: PropTypes.func.isRequired,
};

export default connect(null, { deleteDestinations })(Destinations);
