import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = ({ login, auth: { isAuthenticated } }) => {
  //each input requires a state and onChange handler
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  //destructuring: name === formData.name
  const { email, password } = formData;

  // spread operator: ...formData === copy of formData based on each attribute

  const handleEmailChange = e => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePasswordChange = e => {
    setFormData({ ...formData, password: e.target.value });
  };

  //when the form is submitted, trigger the login action
  const handleSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };

  // once the user is logged in, redirect to the dashboard
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user-circle'> Start Exploring</i>
      </p>
      <form onSubmit={handleSubmit} className='form'>
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
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
      <p className='vert-m-1'>
        Don't have have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

//mapping the auth redux state to a usable prop to check for authentication
const mapStateToProps = state => ({
  auth: state.auth //propName: state
});

export default connect(mapStateToProps, { login })(Login);
