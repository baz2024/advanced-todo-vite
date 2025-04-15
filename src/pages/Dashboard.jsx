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