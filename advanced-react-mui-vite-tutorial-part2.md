
# Advanced React + MUI Tutorial (Part 2: GitHub + API Integration)

**Author**: Dr. Basel Magableh  
**Date**: April 2025

---

## Overview

In this continuation of the advanced React + Material UI tutorial (Vite version), we will:

- Create a GitHub repository and push your Vite project.
- Use Visual Studio Code (VS Code) to manage Git version control.
- Integrate **two APIs** in the React project:
  1. [Pravatar](https://pravatar.cc/) for user avatars.
  2. [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos) to populate the Data Grid dynamically.

---

## Step 1: Create a GitHub Repository

1. Go to [https://github.com](https://github.com) and log in.
2. Click on **"New repository"**.
3. Name your repo: `advanced-todo-vite`
4. Do **not** initialize with README (you’ll do that locally).
5. Click **Create repository**.

---

## Step 2: Push Project Using VS Code

1. Open your Vite project in **VS Code**.
2. Open the integrated terminal and initialize git:

```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/advanced-todo-vite.git
```

3. Add all files and commit:

```bash
git add .
git commit -m "Initial commit"
```

4. Push the code:

```bash
git branch -M main
git push -u origin main
```

---

## Step 3: Extend the React Project With APIs

### 1. Update Navbar to Use Pravatar Image

```javascript
// components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ onMenuClick }) => {
  const username = localStorage.getItem('user') || 'User';
  const avatarUrl = `https://i.pravatar.cc/150?u=${username}`;

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Dashboard</Typography>
        <Tooltip title={username}>
          <Avatar src={avatarUrl} />
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
```

---

### 2. Fetch Tasks From JSONPlaceholder API

```javascript
// pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BreadcrumbsNav from '../components/BreadcrumbsNav';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Task', width: 250 },
    { field: 'completed', headerName: 'Status', width: 130, valueFormatter: (params) => params.value ? 'Done' : 'Pending' },
  ];

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => res.json())
      .then(data => setRows(data))
      .catch(error => console.error("Error loading tasks:", error));
  }, []);

  return (
    <>
      <Navbar onMenuClick={() => setOpen(true)} />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <Box sx={{ p: 2 }}>
        <BreadcrumbsNav />
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5">Welcome Back!</Typography>
            <Typography variant="body1">Here are your latest tasks from API:</Typography>
          </CardContent>
        </Card>
        <DataGrid autoHeight rows={rows} columns={columns} pageSize={5} />
      </Box>
    </>
  );
};

export default Dashboard;
```

---

## Summary

In this second part of the tutorial, we:

- Created a GitHub repository and pushed the code using VS Code.
- Integrated `pravatar` to display user profile avatars.
- Used `jsonplaceholder.typicode.com/todos` to dynamically load and show tasks in the Data Grid.

These additions bring your Vite-based React + MUI application closer to real-world scenarios with version control and data fetching.

---

## Next Steps

- Add error handling and loading indicators.
- Create components to manage task CRUD using a mock API.
- Use context for global authentication state.

