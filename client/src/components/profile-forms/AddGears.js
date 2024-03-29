import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom'; // withRouter: to get access to the history object's properties
import { setAlert } from '../../actions/alert';

//redux
import { addGears } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const AddGears = ({ addGears, history, setAlert }) => {
  // The history object is passed by React within the default props. We are destructuring props.history.

  // user inputs must have corresponding states
  const [formData, setFormData] = React.useState({
    hikeGear: '',
    campGear: '',
    waterGear: '',
    snowGear: '',
    rockClimbingGear: '',
  });

  const { hikeGear, campGear, waterGear, snowGear, rockClimbingGear } =
    formData;

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
    if (
      !hikeGear &&
      !campGear &&
      !waterGear &&
      !snowGear &&
      !rockClimbingGear
    ) {
      window.scrollTo(0, 0);
      setAlert('Please fill in some gear.', 'danger');
    } else {
      addGears(formData, history);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Gear</h1>
      <p className='lead'>
        <i className='fas fa-map-signs text-primary'></i> Add all your essential
        gear for an adventure.
      </p>

      <form className='form' onSubmit={handleSubmit}>
        <div className='line'></div>
        <div className='form-group'>
          <h5>Hiking</h5>
          <input
            type='text'
            placeholder='Hiking Gear'
            name='hikeGear'
            value={hikeGear}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h5>Camping</h5>
          <input
            type='text'
            placeholder='Camping Gear'
            name='campGear'
            value={campGear}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h5>Water Sports</h5>
          <input
            type='text'
            placeholder='Water Gear'
            name='waterGear'
            value={waterGear}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h5>Snow Sports</h5>
          <input
            type='text'
            placeholder='Snow Gear'
            name='snowGear'
            value={snowGear}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h5>Rock Climbing</h5>
          <input
            type='text'
            placeholder='Rock Climbing Gear'
            name='rockClimbingGear'
            value={rockClimbingGear}
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

AddGears.propTypes = {
  addGears: PropTypes.func.isRequired,
};

export default connect(null, { addGears, setAlert })(withRouter(AddGears));
