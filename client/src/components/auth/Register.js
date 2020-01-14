import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert }) => {
  //each input requires a state and onChange handler
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  //destructuring: name === formData.name
  const { name, email, password, confirmPassword } = formData;

  // spread operator: ...formData === copy of formData based on each attribute
  const handleNameChange = e => {
    // let formDataCopy = {
    //   name: e.target.value,
    //   email,
    //   password,
    //   confirmPassword
    // };
    // setFormData(formDataCopy);
    setFormData({ ...formData, name: e.target.value });
  };

  const handleEmailChange = e => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePasswordChange = e => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleConfirmPasswordChange = e => {
    setFormData({ ...formData, confirmPassword: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // after connecting the setAlert action, we can use it by passing a prop to the component.
      // pass a message and alert type to the setAlert action.
      setAlert('Passwords did not match.', 'danger');
    } else {
      console.log('register successful.');
    }
  };

  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign up</h1>
      <p className='lead'>
        <i className='fas fa-user-circle'> Create Your Account</i>
      </p>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={e => handleNameChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => handleEmailChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => handlePasswordChange(e)}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={e => handleConfirmPasswordChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
      <p className='vert-m-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </section>
  );
};

// validate data types of values passed through props
Register.propTypes = {
  setAlert: PropTypes.func.isRequired
};

// in order to use connect() to use actions.
// this will allow us to access props.setAlert
export default connect(null, { setAlert })(Register);
