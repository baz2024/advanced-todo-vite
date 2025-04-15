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