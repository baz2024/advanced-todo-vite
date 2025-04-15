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