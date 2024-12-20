import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { addOwner } from '../api/ownerService'; // Assuming the function to add owner is created

const AddOwner = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      await addOwner({ name, email });
      setName('');
      setEmail('');
      setError('');
      // Redirect or show success message (e.g., with a toast or a success alert)
    } catch (error) {
      setError('Error adding owner. Please try again.');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add New Owner
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" color="primary" type="submit">
          Add Owner
        </Button>
      </form>
    </Box>
  );
};

export default AddOwner;
