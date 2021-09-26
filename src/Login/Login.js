import axios from 'axios';
import React, { useContext, useState } from 'react';
import { authContext } from '../AuthContext/authContext';
import './login.css';

const GET_TOKEN_URL = 'https://60dff0ba6b689e001788c858.mockapi.io/tokens';


const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email === '') {
    return 'Required';
  }
  if (!emailRegex.test(email)) {
    return 'Must be valid email';
  }
};

const validatePassword = (password) => {
  if (password === '') {
    return 'Required';
  }
  if (password.length < 8) {
    return 'At least 8 characters';
  }
};

function Login(props) {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });
  // const [successLogin, setSuccessLogin] = useState(false);
  const [user, setUser] = useContext(authContext);

  const onChangehandle = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });

    setTouched({
      ...touched,
      [event.target.name]: true
    });
  };

  const onBlurHandle = (event) => {
    setTouched({
      ...touched,
      [event.target.name]: true
    });
  };

  const submitHandle = (event) => {
    event.preventDefault();
    if(!validatePassword(values.password) && !validateEmail(values.email)){
        axios({
          method: 'GET',
          url: GET_TOKEN_URL
        }).then((res) => {
          console.log(res);
          setUser(res.data);
        })
    }
  };

  const messageEmail = validateEmail(values.email);
  const messagePassword = validatePassword(values.password);

  return (
    <div className='login'>
      <h1>{'Logins'}</h1>
      <form onSubmit={submitHandle}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={onChangehandle}
          onBlur={onBlurHandle}
        />
        {touched.email && messageEmail && <div className='error'>{messageEmail}</div>}
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={onChangehandle}
          onBlur={onBlurHandle}
        />
        {touched.password && messagePassword && <div className='error'>{messagePassword}</div>}
        <button className='submit-btn' type='submit'>
          Submit
        </button>

        {user && <div className='success-message'>{'Login success'}</div>}
      </form>
    </div>
  );
}

export default Login;
