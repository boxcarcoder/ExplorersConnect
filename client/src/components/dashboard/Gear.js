import React, { Fragment } from 'react';

const Gear = () => {
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
          <tr>
            <td>Salomon Odyssey Pro</td>
            <td>NatureHike CloudUp 2</td>
            <td>Chaco Z1</td>
            <td>Burton Board</td>
            <td></td>
          </tr>
          <tr>
            <td>Black Diamond Distance Z</td>
            <td>Aegismax M2</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>Thermarest Prolite Plus</td>
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

export default Gear;
