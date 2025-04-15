import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
    const [password, setPassword] = useState('');
  const handleLogin = () => {
    if (username) {
      localStorage.setItem('user', username);
      //encrypt password
        // For demonstration purposes, we're storing the password directly
        // In a real-world application, you should hash the password before storing it
        // For example, you can use bcrypt or another hashing library
         
      localStorage.setItem('pass', password);

      navigate('/dashboard');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField fullWidth label="Username" onChange={e => setUsername(e.target.value)} />
     <TextField fullWidth label="Password" type="password" sx={{ mt: 2 }} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
    </Container>
  );
};

export default Login;