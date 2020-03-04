import React, { Fragment } from 'react';

//redux
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { deleteDestinations } from '../../actions/profile';

  // Use the profile.destinations state (from Dashboard component) for destinations data.
const Destinations = ({ destinations, deleteDestinations }) => {

  // 2. for every row created, give the row a td for padding.
  // css allows td to have padding, but not tr.
  const allWaters = destinations.map(destination =>
    destination.waterAreas.map(water => 
      <tr>
        <td>
          {water}
          <button
            onClick={() => deleteDestinations(destination._id)}
            className='btn btn-danger'
          >
            Delete
          </button>
        </td>
      </tr>
    )
  );

  const allHikes = destinations.map(destination =>
    destination.hikingTrails.map(trail => 
      <tr>
        <td>
          {trail}
        </td>
      </tr>
    )
  );

  const allCamps = destinations.map(destination =>
    destination.campSites.map(camp => 
      <tr>
        <td>
          {camp}
        </td>
      </tr>
    )
  );

  const allSlopes = destinations.map(destination =>
    destination.slopes.map(slope => 
      <tr>
        <td>
          {slope}
        </td>
      </tr>
    )
  );

  const allCrags = destinations.map(destination =>
    destination.crags.map(crag => 
      <tr>
        <td>
          {crag}
        </td>
      </tr>
    )
  );

  const allDeletes = destinations.map(destination =>
    destination.waterAreas.map(water => (
      <tr>
        <td>
          <button
            onClick={() => deleteDestinations(destination._id)}
            className='btn btn-danger'
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  );
  /*  
  const allDestinations = destinations.map(destination => (
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
  */

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
        <tbody>
          {/*1. each column creates rows*/}
          <td>{allHikes}</td>
          <td>{allCamps}</td>
          <td>{allWaters}</td>
          <td>{allSlopes}</td>
          <td>{allCrags}</td>
          <td>{allDeletes}</td>
        </tbody>
      </table>
    </Fragment>
  );
};

Destinations.propTypes = {
  destinations: PropTypes.array.isRequired,
  deleteDestinations: PropTypes.func.isRequired
};

export default connect(null, { deleteDestinations })(Destinations);
