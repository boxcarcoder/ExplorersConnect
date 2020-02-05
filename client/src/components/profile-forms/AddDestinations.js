import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const AddDestinations = () => {
  //user inputs must have corresponding states
  const [formData, setFormData] = useState({
    hikingTrails: '',
    campSites: '',
    waterAreas: '',
    slopes: '',
    crags: ''
  });

  const { hikingTrails, campSites, waterAreas, slopes, crags } = formData;

  // e.target.name is the name of the input
  // e.target.value is the user input
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Destinations</h1>
      <p className='lead'>
        <i className='fas fa-map-signs text-primary'></i> Add any places you've
        loved exploring.
      </p>
      <small>
        Please use comma separated values (eg. Mammoth Lakes, Mt. High)
      </small>
      <form className='form'>
        <div className='line'></div>
        <div className='form-group'>
          <h5>Hiking Trails</h5>
          <input
            type='text'
            placeholder='Trail Name'
            name='hikingTrails'
            value={hikingTrails}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h5>Campsites</h5>
          <input
            type='text'
            placeholder='Camp Site'
            name='campSites'
            value={campSites}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h5>Lakes, Rivers, or Oceans</h5>
          <input
            type='text'
            placeholder='Body of Water'
            name='waterAreas'
            value={waterAreas}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h5>Snow Resorts</h5>
          <input
            type='text'
            placeholder='Slopes'
            name='slopes'
            value={slopes}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h5>Crags</h5>
          <input
            type='text'
            placeholder='Rock faces'
            name='crags'
            value={crags}
            onChange={e => onChange(e)}
          />
        </div>

        <div>
          <small>* = required fields</small>
        </div>

        <div className='vert-m-1'>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </div>
      </form>
    </Fragment>
  );
};

export default AddDestinations;
