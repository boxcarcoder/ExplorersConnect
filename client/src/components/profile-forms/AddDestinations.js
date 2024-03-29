import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom'; //withRouter: to get access to the history object's properties
import { setAlert } from '../../actions/alert';

//redux
import { addDestinations } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const AddDestinations = ({ addDestinations, history, setAlert }) => {
  // The history object is passed by React within the default props. We are destructuring props.history.

  // user inputs must have corresponding states
  const [formData, setFormData] = React.useState({
    hikingTrails: '',
    campSites: '',
    waterAreas: '',
    slopes: '',
    crags: '',
  });

  const { hikingTrails, campSites, waterAreas, slopes, crags } = formData;

  // e.target.name is the name of the input
  // e.target.value is the user input
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hikingTrails && !campSites && !waterAreas && !slopes && !crags) {
      window.scrollTo(0, 0);
      setAlert('Please fill in some destinations.', 'danger');
    } else {
      addDestinations(formData, history);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Destinations</h1>
      <p className='lead'>
        <i className='fas fa-map-signs text-primary'></i> Add where you've
        explored during your favorite trips.
      </p>

      <form className='form' onSubmit={handleSubmit}>
        <div className='line'></div>
        <div className='form-group'>
          <h5>Hiking Trails</h5>
          <input
            type='text'
            placeholder='Trail Name'
            name='hikingTrails'
            value={hikingTrails}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h5>Campsites</h5>
          <input
            type='text'
            placeholder='Camp Site'
            name='campSites'
            value={campSites}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h5>Lakes, Rivers, or Oceans</h5>
          <input
            type='text'
            placeholder='Body of Water'
            name='waterAreas'
            value={waterAreas}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h5>Snow Resorts</h5>
          <input
            type='text'
            placeholder='Slopes'
            name='slopes'
            value={slopes}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h5>Crags</h5>
          <input
            type='text'
            placeholder='Rock faces'
            name='crags'
            value={crags}
            onChange={(e) => onChange(e)}
          />
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

AddDestinations.propTypes = {
  addDestinations: PropTypes.func.isRequired,
};

export default connect(null, { addDestinations, setAlert })(
  withRouter(AddDestinations)
);
