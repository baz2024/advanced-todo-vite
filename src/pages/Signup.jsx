import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username.trim(), password);
  };

  return (
    <Container>
      <Typography variant="h5">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" fullWidth margin="normal" onChange={e => setUsername(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" onChange={e => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" fullWidth>Sign Up</Button>
      </form>
    </Container>
  );
};

export default Signup;