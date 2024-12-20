import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { hireWorker } from '../api/workerService';
import { useNavigate } from 'react-router-dom'; // For navigation after submitting form
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet'; // For creating custom markers

const AddWorker = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const navigate = useNavigate();

  // Function to handle map clicks
  const LocationMap = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLatitude(lat);
        setLongitude(lng);
      },
    });

    // Marker placed at the clicked position
    const markerPosition = latitude && longitude ? [latitude, longitude] : [51.505, -0.09];

    return (
      <>
        <Marker position={markerPosition}>
          <Popup>Selected Location</Popup>
        </Marker>
      </>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newWorker = {
        name,
        email,
        hourlyRate: parseFloat(hourlyRate),
        location: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
      };
      await hireWorker(newWorker);
      navigate('/worker'); // Redirect to worker list after adding
    } catch (error) {
      console.error('Error adding worker:', error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add Worker
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Worker Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Worker Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Hourly Rate"
          variant="outlined"
          fullWidth
          margin="normal"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          required
        />

        {/* Map to select location */}
        <div style={{ height: '300px', width: '100%' }}>
          <MapContainer
            center={[51.505, -0.09]} // Default map center (London)
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMap />
          </MapContainer>
        </div>

        <TextField
          label="Latitude"
          variant="outlined"
          fullWidth
          margin="normal"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
          disabled // Disabled because the value is set by clicking on the map
        />
        <TextField
          label="Longitude"
          variant="outlined"
          fullWidth
          margin="normal"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
          disabled // Disabled because the value is set by clicking on the map
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Create Worker
        </Button>
      </form>
    </Box>
  );
};

export default AddWorker;
