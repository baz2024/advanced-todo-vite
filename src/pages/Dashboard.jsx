import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BreadcrumbsNav from '../components/BreadcrumbsNav';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
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
    <Button onClick={handleAddTask}>Add</Button>
  </DialogActions>
</Dialog>
        <DataGrid autoHeight rows={rows} columns={columns} pageSize={5} />
      </Box>
    </>
  );
};

export default Dashboard;