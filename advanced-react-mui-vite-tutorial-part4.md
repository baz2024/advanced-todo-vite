
# Advanced React + MUI Tutorial (Part 4: Signup & Password Encryption)

**Author**: Dr. Basel Magableh  
**Date**: April 2025

---

## Overview

In this fourth part of the tutorial, we will:

- Add a **Sign Up page** to register new users.
- Store **username and encrypted password** in `localStorage`.
- Use **bcryptjs** for secure password hashing.
- Validate login credentials with encrypted password.

---

## Step 1: Install bcryptjs

```bash
npm install bcryptjs
```

---

## Step 2: Create Sign Up Page

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
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isTaken = existingUsers.find(u => u.username === username);

    if (isTaken) {
      alert("Username already exists!");
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUsers = [...existingUsers, { username, password: hashedPassword }];
    localStorage.setItem('users', JSON.stringify(newUsers));
    alert("Signup successful! You can now login.");
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

## Step 3: Update Login Page to Check Hashed Password

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
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username);

    if (!user) {
      alert("User not found");
      return;
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      alert("Incorrect password");
      return;
    }

    login(username);
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField fullWidth label="Username" margin="normal" onChange={e => setUsername(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
    </Container>
  );
};

export default Login;
```

---

## Step 4: Add Route for Signup

### App.jsx

```javascript
import Signup from './pages/Signup';

<Routes>
  <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
</Routes>
```

---

## Step 5: Add Link to Signup Page in Login

### Add in Login.jsx below form:

```jsx
<Typography sx={{ mt: 2 }}>
  Don’t have an account? <a href="/signup">Sign up</a>
</Typography>
```

---

## Summary

In Part 4, we added:

- A **sign-up page** that securely stores user credentials in localStorage using `bcryptjs`.
- Login verification using encrypted password comparison.
- Routing to allow new user registration.

---

## Next Steps

- Add JWT or session-based auth for production.
- Use Firebase or Supabase to persist user accounts.
- Add password validation rules and feedback.

