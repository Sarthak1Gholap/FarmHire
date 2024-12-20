import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const HireEquipment = ({ id }) => {
  const handleHire = async () => {
    try {
      await axios.post('/api/equipment/hire', { equipmentId: id });
      alert('Equipment hired successfully');
    } catch (error) {
      console.error('Error hiring equipment', error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleHire}>
      Hire Equipment
    </Button>
  );
};

export default HireEquipment;
