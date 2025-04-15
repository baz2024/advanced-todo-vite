
# Advanced React + MUI Tutorial (Part 4: Fixed Signup & Password Encryption)

**Author**: Dr. Basel Magableh  
**Date**: April 2025

---

## Overview

This updated tutorial improves the sign-up and login system by ensuring:

- Usernames and passwords are normalized.
- Encrypted passwords are stored in localStorage using `bcryptjs`.
- Login checks the hash correctly and allows access.

---

## Step 1: Install bcryptjs

```bash
npm install bcryptjs
```

---

## Step 2: Fixed Signup Page

```javascript
// pages/Signup.jsx
import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    const normalizedUsername = username.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.username === normalizedUsername);
    if (userExists) {
      alert("Username already exists.");
      return;
    }

    const hashedPassword = bcrypt.hashSync(password.trim(), 10);
    users.push({ username: normalizedUsername, password: hashedPassword });

    localStorage.setItem('users', JSON.stringify(users));
    alert("Signup successful. You can now log in.");
    navigate('/');
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

## Step 3: Fixed Login Page

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
      alert("User not found.");
      return;
    }

    const isMatch = bcrypt.compareSync(password.trim(), foundUser.password);
    if (!isMatch) {
      alert("Incorrect password.");
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

## Step 4: Example localStorage Structure

```json
[
  {
    "username": "basel",
    "password": "$2a$10$Lt1FZ...encrypted..."
  }
]
```

Check your browser dev tools → Application → localStorage → key `users`.

---

## Step 5: Add Signup Route

In `App.jsx`, update your routes:

```jsx
<Route path="/signup" element={<Signup />} />
```

---

## Summary

- Usernames are stored in lowercase.
- Passwords are trimmed and hashed with bcryptjs.
- Login works by comparing plaintext input against hashed values.

✅ Now you can sign up, login securely, and work with authenticated sessions in memory.

---

## What’s Next?

- Add Firebase (see Part 5)
- Create a user profile page
- Support logout and session cleanup
