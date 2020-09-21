import React, { Fragment } from 'react';

//redux
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { deleteGears } from '../../actions/profile';

export const Gears = ({ gears, deleteGears }) => {
  // Use the profile.gears state (from Dashboard component) for gears data.
  const allGears = gears.map((gear) => (
    <tr key={gear._id}>
      <td>{gear.hikeGear}</td>
      <td>{gear.campGear}</td>
      <td>{gear.waterGear}</td>
      <td>{gear.snowGear}</td>
      <td>{gear.rockClimbingGear}</td>
      <td>
        <button
          onClick={() => deleteGears(gear._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='vert-m-1'>Essential Gear</h2>
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
        <tbody>{allGears}</tbody>
      </table>
    </Fragment>
  );
};

Gears.propTypes = {
  gears: PropTypes.array.isRequired,
};

export default connect(null, { deleteGears })(Gears);
