
# Advanced React + MUI Tutorial (Part 5: Firebase Authentication)

**Author**: Dr. Basel Magableh  
**Date**: April 2025

---

## Overview

In this fifth part of the React + MUI tutorial, we will:

- Integrate **Firebase Authentication**
- Enable **Email & Password** and **Google Sign-In**
- Replace localStorage-based auth with **secure Firebase Auth**
- Use React Context to handle Firebase user globally

---

## Step 1: Create Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add Project**, enter name and continue.
3. Go to **Authentication > Get Started**
4. Enable **Email/Password** and **Google** providers.

---

## Step 2: Install Firebase SDK

```bash
npm install firebase
```

---

## Step 3: Firebase Configuration

```javascript
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
```

---

## Step 4: Auth Context for Firebase

```javascript
// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

---

## Step 5: Signup & Login with Firebase

```javascript
// pages/Login.jsx
import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4">Login</Typography>
      <TextField fullWidth label="Email" onChange={e => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" sx={{ mt: 2 }} onChange={e => setPassword(e.target.value)} />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleEmailLogin}>Login</Button>
      <Button fullWidth variant="outlined" sx={{ mt: 2 }} onClick={handleGoogleLogin}>Login with Google</Button>
    </Container>
  );
};

export default Login;
```

---

## Step 6: Sign Up Page with Firebase

```javascript
// pages/Signup.jsx
import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4">Sign Up</Typography>
      <TextField fullWidth label="Email" onChange={e => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" sx={{ mt: 2 }} onChange={e => setPassword(e.target.value)} />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSignup}>Sign Up</Button>
    </Container>
  );
};

export default Signup;
```

---

## Step 7: Update Routing

```javascript
// App.jsx
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
    </Routes>
  );
};
```

---

## Step 8: Show User Info & Logout in Navbar

```javascript
// components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Tooltip, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Dashboard</Typography>
        {user && (
          <>
            <Tooltip title={user.email}>
              <Avatar src={user.photoURL || undefined}>{user.email?.[0]}</Avatar>
            </Tooltip>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
```

---

## Summary

In Part 5, we added **Firebase Authentication** with:

- Email/Password and Google Sign-In
- Auth context that listens to login/logout
- A secure way to manage authentication in your app

---

## Next Steps

- Add protected routes using HOCs or layout wrappers
- Store user profile info in Firestore
- Support password reset and email verification

