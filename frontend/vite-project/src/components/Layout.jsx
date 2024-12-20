import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './Navbar'; // Import Navbar component
import Sidebar from './Sidebar'; // Import Sidebar component

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar /> {/* Fixed at the top */}
      <Sidebar /> {/* Fixed on the left */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children} {/* Render the current route's component */}
      </Box>
    </Box>
  );
};

export default Layout;
