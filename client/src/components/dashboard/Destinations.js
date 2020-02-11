import React, { Fragment } from 'react';

const Destinations = () => {
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
          <tr>
            <td>Lower Moro Trail</td>
            <td>Joshua Tree</td>
            <td>Big Bear Lake</td>
            <td>Tahoe</td>
            <td>Red Rock Canyon</td>
          </tr>
          <tr>
            <td>Red Rock Canyon Trail</td>
            <td>Spruce Grove</td>
            <td></td>
            <td></td>
            <td>Joshua Tree</td>
          </tr>
          <tr>
            <td>Mt.Baldy</td>
            <td>Mt.Baldy</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
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

export default Destinations;
