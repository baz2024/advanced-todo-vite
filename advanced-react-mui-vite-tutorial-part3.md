
# Advanced React + MUI Tutorial (Part 3: CRUD + Auth Context)

**Author**: Dr. Basel Magableh  
**Date**: April 2025

---

## Overview

In this third part of the tutorial, we will:

- Add global **authentication state** using React Context API.
- Implement **CRUD (Create, Read, Update, Delete)** operations on tasks using `jsonplaceholder.typicode.com`.
- Improve user experience with form inputs and modals.

---

## Step 1: Setup React Context for Auth

### 1. Create `AuthContext.jsx`

```javascript
// src/context/AuthContext.jsx
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

### 2. Update `main.jsx`

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

---

## Step 2: Update Login Page with Auth Context

```javascript
// pages/Login.jsx
import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    if (username) {
      login(username);
      navigate('/dashboard');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField fullWidth label="Username" onChange={e => setUsername(e.target.value)} />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
    </Container>
  );
};

export default Login;
```

---

## Step 3: Add Task CRUD in Dashboard

### 1. Add Buttons and Dialog

```bash
npm install @mui/icons-material
```

```javascript
// Inside Dashboard.jsx (add to imports)
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
```

### 2. Modify Dashboard Component

```javascript
const [openDialog, setOpenDialog] = useState(false);
const [newTask, setNewTask] = useState('');

const handleAddTask = () => {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({
      title: newTask,
      completed: false,
      userId: 1
    }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })
    .then(response => response.json())
    .then(data => {
      setRows(prev => [...prev, { ...data, id: prev.length + 1 }]);
      setOpenDialog(false);
      setNewTask('');
    });
};
```

### 3. Add Dialog UI and Button

```jsx
<Button
  variant="contained"
  startIcon={<AddIcon />}
  onClick={() => setOpenDialog(true)}
  sx={{ mb: 2 }}
>
  Add Task
</Button>

<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
  <DialogTitle>Add New Task</DialogTitle>
  <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      label="Task Title"
      fullWidth
      variant="outlined"
      value={newTask}
      onChange={e => setNewTask(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
    <Button onClick={handleAddTask}>Add</Button>
  </DialogActions>
</Dialog>
```

---

## Summary

In Part 3, we extended the app with:

- **Global Auth Context** for managing login/logout state.
- A **modal form** to **create new tasks** and show them in the Data Grid.
- Prepared the app for full CRUD integration and user role management.

---

## Suggested Next Steps

- Implement edit and delete operations.
- Integrate a real backend or Supabase/Firebase.
- Add authentication guards and private routes.

