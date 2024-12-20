import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { addFarmer } from '../api/farmerService';

const AddFarmer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFarmer = { name, email };

    try {
      await addFarmer(newFarmer);
      navigate('/farmer'); // Redirect to the farmer list after adding
    } catch (error) {
      console.error('Error adding farmer:', error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Farmer
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Farmer
        </Button>
      </form>
    </Container>
  );
};

export default AddFarmer;
