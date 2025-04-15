
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
```

---

## ✅ Updated `Login.jsx`

```javascript
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
```

---

## ✅ Reminder: AuthContext (for context)

```javascript
// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const navigate = useNavigate();

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(u => u.username === username);

    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      setUser({ username });
      localStorage.setItem('user', JSON.stringify({ username }));
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const signup = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existing = users.find(u => u.username === username);
    if (existing) {
      alert('User already exists');
      return;
    }
    const hashed = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashed });
    localStorage.setItem('users', JSON.stringify(users));
    login(username, password);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```
### Dashboard.jsx
```javascript
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BreadcrumbsNav from '../components/BreadcrumbsNav';
import { useAuth } from '../context/AuthContext';
 
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { logout } = useAuth();
  const rows = [
    { id: 1, task: 'Finish report', status: 'Done' },
    { id: 2, task: 'Update website', status: 'Pending' },
  ];
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'task', headerName: 'Task', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return (
    <>
      <Navbar onMenuClick={() => setOpen(true)} />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <Box sx={{ p: 2 }}>
         <Typography variant="h4">Welcome, {user?.username}</Typography>
      <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
        <BreadcrumbsNav />
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5">Welcome Back!</Typography>
            <Typography variant="body1">Here are your tasks:</Typography>
          </CardContent>
        </Card>
        <DataGrid autoHeight rows={rows} columns={columns} pageSize={5} />
      </Box>
    </>
  );
};

export default Dashboard;
```
### Main.jsx to include AuthProvider
```javascript
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
```
### Update App.jsx 
```javascript 
// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
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

## ✅ Summary

- Users are now saved with encrypted passwords.
- Signup correctly updates localStorage and login context.
- Login validates credentials and redirects on success.
- You can now continue to use this secure local-only authentication system or move to Firebase in Part 5.

