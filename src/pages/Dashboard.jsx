// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Box, Button,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BreadcrumbsNav from '../components/BreadcrumbsNav';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState('');

  const [rows, setRows] = useState([
    { id: 1, task: 'Finish report', status: 'Done' },
    { id: 2, task: 'Update website', status: 'Pending' },
  ]);

  const handleAddTask = () => {
    const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;

    const newRow = {
      id: newId,
      task: newTask,
      status: 'Pending' // Blank status
    };

    setRows(prev => [...prev, newRow]);
    setOpenDialog(false);
    setNewTask('');
  };

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
        <Typography variant="h4">Welcome, {user?.email || user?.username}</Typography>
        <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>

        <BreadcrumbsNav />

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5">Welcome Back!</Typography>
            <Typography variant="body1">Here are your tasks:</Typography>
          </CardContent>
        </Card>

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
            <Button onClick={handleAddTask} disabled={!newTask.trim()}>Add</Button>
          </DialogActions>
        </Dialog>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          autoHeight
        />
      </Box>
    </>
  );
};

export default Dashboard;