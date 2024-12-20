import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Home, Settings, Info, AccountCircle } from '@mui/icons-material';

const Sidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Profile', icon: <AccountCircle />, path: '/profile' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
    { text: 'About', icon: <Info />, path: '/about' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Box p={2}>
        <Typography variant="h6" align="center">
          MyApp
        </Typography>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
