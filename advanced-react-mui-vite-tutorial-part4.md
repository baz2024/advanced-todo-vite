
# Advanced React + MUI Tutorial (Part 4: Fixed Signup & Login with Encrypted Passwords)

**Author**: Dr. Basel Magableh  
**Date**: April 2025

---

## Overview

This updated version of Part 4 fixes the following:

- Signup now correctly saves encrypted user info to `localStorage`.
- Login works reliably with `bcryptjs` password matching.
- Users are redirected to `/dashboard` after signup/login.
- Inputs are normalized to avoid mismatch issues.

---

## 🔧 Dependencies

```bash
npm install bcryptjs
```

---

## ✅ New `Signup.jsx`

```javascript
// pages/Signup.jsx
import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = () => {
    const normalizedUsername = username.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!normalizedUsername || !trimmedPassword) {
      alert("Username and password are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === normalizedUsername);

    if (userExists) {
      alert("Username already exists.");
      return;
    }

    const hashedPassword = bcrypt.hashSync(trimmedPassword, 10);
    const newUser = { username: normalizedUsername, password: hashedPassword };
    const updatedUsers = [...users, newUser];

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    login(normalizedUsername);
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
      <TextField fullWidth label="Username" margin="normal" onChange={e => setUsername(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSignup}>Sign Up</Button>
    </Container>
  );
};

export default Signup;
```

---

## ✅ Updated `Login.jsx`

```javascript
// pages/Login.jsx
import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import bcrypt from 'bcryptjs';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    const normalizedUsername = username.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(user => user.username === normalizedUsername);

    if (!foundUser) {
      alert("User not found. Try signing up.");
      return;
    }

    const isMatch = bcrypt.compareSync(password.trim(), foundUser.password);
    if (!isMatch) {
      alert("Incorrect password. Please try again.");
      return;
    }

    login(normalizedUsername);
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField fullWidth label="Username" margin="normal" onChange={e => setUsername(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
      <Typography sx={{ mt: 2 }}>
        Don’t have an account? <a href="/signup">Sign up</a>
      </Typography>
    </Container>
  );
};

export default Login;
```

---

## ✅ Reminder: AuthContext (for context)

```javascript
// context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || '');

  const login = (username) => {
    localStorage.setItem('user', username);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser('');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

---

## ✅ Summary

- Users are now saved with encrypted passwords.
- Signup correctly updates localStorage and login context.
- Login validates credentials and redirects on success.
- You can now continue to use this secure local-only authentication system or move to Firebase in Part 5.

