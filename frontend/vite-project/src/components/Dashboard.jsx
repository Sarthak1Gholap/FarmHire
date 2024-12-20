import React from 'react';
import { Box, Grid, Paper, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header with Home Icon and Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
        <IconButton edge="start" color="primary" onClick={() => navigate('/')} sx={{ marginRight: 2 }}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>
      </Box>

      {/* Grid layout for sections */}
      <Grid container spacing={4} justifyContent="center">
        {/* Equipment Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 3, textAlign: 'center', boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Equipment
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              View, manage and rent agricultural equipment.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/equipment')}>
              Go to Equipment
            </Button>
          </Paper>
        </Grid>

        {/* Farmer Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 3, textAlign: 'center', boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Farmer
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Manage farmer profiles, view crops and equipment.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/farmer')}>
              Go to Farmer Section
            </Button>
          </Paper>
        </Grid>

        {/* Owner Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 3, textAlign: 'center', boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Owner
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Manage your farm and equipment business.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/owner')}>
              Go to Owner Section
            </Button>
          </Paper>
        </Grid>

        {/* Worker Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 3, textAlign: 'center', boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Worker
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              View assigned tasks and work schedules.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/worker')}>
              Go to Worker Section
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
