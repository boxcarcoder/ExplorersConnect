import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  //each input requires a state and onChange handler
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  //destructuring: name === formData.name
  let { name, email, password, confirmPassword } = formData;

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

  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign up</h1>
      <p className='lead'>
        <i className='fas fa-user-circle'> Create Your Account</i>
      </p>
      <form action='dashboard.html' className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={handleNameChange}
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

export default Register;
