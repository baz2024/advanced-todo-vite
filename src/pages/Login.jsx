import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username.trim(), password);
  };

  return (
    <Container>
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" fullWidth margin="normal" onChange={e => setUsername(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" onChange={e => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" fullWidth>Login</Button>
        <Typography variant="body2" mt={2}>
          No account? <Link to="/signup">Sign up</Link>
        </Typography>
      </form>
    </Container>
  );
};

export default Login;