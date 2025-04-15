# 🚀 Advanced React + MUI Tutorial (Part 5: Firebase Authentication)

**Author**: Dr. Basel Magableh  
**Date**: April 2025

---

## 📋 Overview

In this fifth part of the React + MUI series, you will:

- Set up **Firebase Authentication**
- Enable **Email/Password** and **Google Sign-In**
- Replace localStorage auth with secure **Firebase-based auth**
- Use **React Context** to manage user state globally

---

## ✅ Step 1: Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"** and enter a name, e.g., `advtodo`
3. Click **Continue** and disable Google Analytics (optional)
4. Click **Create project**

---

## ✅ Step 2: Register Your Web App

1. In the Firebase console, go to your project dashboard
2. Click the **Web (</>)** icon to register a web app
3. Enter a nickname (e.g. `ReactApp`) and click **Register app**
4. Firebase will now show your app’s configuration (see next step)

---

## ✅ Step 3: Configure Firebase in React

### 🔧 Install Firebase SDK

```bash
npm install firebase
```

### 🔌 Add `firebase.js`

```js
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBx_wvy8ezwzZGacaf5vqX9Mr1CnXCx9Mc",
  authDomain: "advtodo-72750.firebaseapp.com",
  projectId: "advtodo-72750",
  storageBucket: "advtodo-72750.firebasestorage.app",
  messagingSenderId: "878348718867",
  appId: "1:878348718867:web:1e6d62bd4f0cbff29200e6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
```

---

## ✅ Step 4: Enable Firebase Authentication Methods

1. In Firebase Console, go to **Build > Authentication**
2. Click **Get Started**
3. In **Sign-in method**, enable:
   - **Email/Password**
   - **Google** (select your project support email)

---

## ✅ Step 5: Set Up Firebase Auth Context

```js
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

## ✅ Step 6: Implement Login Page

```js
// src/pages/Login.jsx
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

## ✅ Step 7: Implement Signup Page

```js
// src/pages/Signup.jsx
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

## ✅ Step 8: Update Routes with Auth Check

```js
// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default App;
```

---

## ✅ Step 9: Navbar with User Info & Logout

```js
// src/components/Navbar.jsx
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

## 🧠 Summary

In this tutorial, you’ve:

- ✅ Set up Firebase project and authentication
- ✅ Enabled Email/Password and Google sign-in
- ✅ Replaced localStorage with Firebase Auth
- ✅ Used React Context to manage login state

---

## 🔜 What's Next?

- Add **protected routes** using layout wrappers or `PrivateRoute`
- Store extra user info in **Firestore**
- Add **password reset** and **email verification**
