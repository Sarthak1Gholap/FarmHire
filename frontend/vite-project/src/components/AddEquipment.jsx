import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px',
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

const AddEquipment = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rentalPrice: '',
    latitude: '',
    longitude: '',
    image: null,
  });

  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'API key', // Replace with your API key
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleMapClick = (event) => {
    if (event.latLng) {
      const latitude = event.latLng.lat();
      const longitude = event.latLng.lng();
      setSelectedLocation({ lat: latitude, lng: longitude });
      setFormData({ ...formData, latitude, longitude });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('rentalPrice', formData.rentalPrice);
    formDataToSend.append('latitude', formData.latitude);
    formDataToSend.append('longitude', formData.longitude);
    formDataToSend.append('image', formData.image);

    try {
      await axios.post('/api/equipment', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Equipment added successfully');
    } catch (error) {
      console.error('Error adding equipment', error);
    }
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Add New Equipment
      </Typography>
      <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  label="Equipment Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  required
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Rental Price"
                  name="rentalPrice"
                  type="number"
                  value={formData.rentalPrice}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Select Equipment Location:
                </Typography>
                <GoogleMap
                  zoom={5}
                  center={selectedLocation}
                  mapContainerStyle={mapContainerStyle}
                  onClick={handleMapClick}
                >
                  <Marker position={selectedLocation} />
                </GoogleMap>
                <Box mt={1}>
                  <Typography variant="body2" color="textSecondary">
                    Latitude: {formData.latitude || 'Not selected'}, Longitude: {formData.longitude || 'Not selected'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Upload Equipment Image:
                </Typography>
                <Button
                  variant="contained"
                  component="label"
                  color="secondary"
                  size="large"
                  fullWidth
                >
                  Upload File
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                  Add Equipment
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddEquipment;
