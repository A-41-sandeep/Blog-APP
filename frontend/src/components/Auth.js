import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authAction } from './../store/index';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSignup, setIsSignup] = useState(true);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setServerError(''); // Reset server error

      const response = await axios.post(
        `http://localhost:5000/api/user/${isSignup ? 'signup' : 'login'}`,
        {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        }
      );

      const data = response.data;
      if (isSignup) {
        if (data.message === 'User already exists with this email.') {
          setServerError(data.message);
        } else {
          sessionStorage.setItem('userId', data.userId); // Use userId from response
          dispatch(authAction.login());
          navigate('/blogs');
        }
      }else{
        sessionStorage.setItem('userId', data.userId);  
        dispatch(authAction.login());
        navigate('/blogs');
      }
  } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setServerError('An account with this email already exists.');
        } else if (error.response.status === 401) {
          setServerError('Invalid email or password. Please try again.');
        } else {
          setServerError('An error occurred. Please try again later.');
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          boxShadow={'10px 10px 20px #ccc'}
          padding={3}
          margin={'auto'}
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? 'Signup' : 'Login'}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="name"
              margin="normal"
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            placeholder="email"
            type={'email'}
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            placeholder="password"
            type={'password'}
            margin="normal"
          />
          <Button
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
            type="submit"
          >
            Submit
          </Button>
          {serverError && <Typography color="error">{serverError}</Typography>}
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignup === true ? 'login' : 'signup'}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
