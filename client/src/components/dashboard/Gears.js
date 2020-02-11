import React, { Fragment } from 'react';

//redux
import { PropTypes } from 'prop-types';

const Gears = ({ gears }) => {
  // Use the profile.gears state (from Dashboard component) for gears data.
  const allGears = gears.map(gear => (
    <tr key={gear._id}>
      <td>{gear.hikeGear}</td>
      <td>{gear.campGear}</td>
      <td>{gear.waterGear}</td>
      <td>{gear.snowGear}</td>
      <td>{gear.rockClimbingGear}</td>
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
          </tr>
        </thead>
        <tbody>
          {allGears}
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

Gears.propTypes = {
  gears: PropTypes.array.isRequired
};

export default Gears;
