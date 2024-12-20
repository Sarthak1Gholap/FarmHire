import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia, Button, Box, IconButton, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Custom data with latitude and longitude
const customData = [
  {
    id: '1',
    name: 'Excavator',
    description: 'Heavy-duty excavator for construction work',
    rentalPrice: 150,
    image: 'https://via.placeholder.com/200?text=Excavator',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: '2',
    name: 'Forklift',
    description: 'Forklift for warehouse and logistics use',
    rentalPrice: 100,
    image: 'https://via.placeholder.com/200?text=Forklift',
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    id: '3',
    name: 'Generator',
    description: 'Portable generator for power supply',
    rentalPrice: 75,
    image: 'https://via.placeholder.com/200?text=Generator',
    latitude: 40.7128,
    longitude: -74.0060,
  },
];

const EquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const fallbackLocation = { lat: 20.5937, lng: 78.9629 }; // Default to India

  useEffect(() => {
    const selectedEquipment = customData.find((item) => item.id === id);
    setEquipment(selectedEquipment);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(userLocation);

          if (selectedEquipment) {
            const equipmentLocation = L.latLng(selectedEquipment.latitude, selectedEquipment.longitude);
            const userLatLng = L.latLng(userLocation.lat, userLocation.lng);
            const calculatedDistance = userLatLng.distanceTo(equipmentLocation); // Distance in meters
            setDistance(calculatedDistance);
          }
        },
        (error) => {
          console.error('Error getting current location', error);
          setLocationError('Location access denied. Using fallback location.');
          setCurrentLocation(fallbackLocation);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
      setLocationError('Geolocation is not supported by this browser.');
      setCurrentLocation(fallbackLocation);
    }
  }, [id]);

  if (!equipment || !currentLocation) return <div>Loading...</div>;

  return (
    <Paper
      sx={{
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Back Button */}
      <Box sx={{ position: 'fixed', top: 16, left: 16 }}>
        <IconButton
          edge="start"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Card
        sx={{
          maxWidth: 800,
          marginTop: 4,
          borderRadius: 2,
          boxShadow: 3,
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={equipment.image || 'default-image-url.jpg'}
          alt={equipment.name}
          sx={{ objectFit: 'cover' }}
        />

        <CardContent sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {equipment.name}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {equipment.description}
          </Typography>
          <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
            ${equipment.rentalPrice} per day
          </Typography>
          <Button variant="contained" color="primary" fullWidth sx={{ padding: 1.5 }}>
            Hire
          </Button>
        </CardContent>

        {/* Map Section */}
        <Box sx={{ position: 'relative', height: '400px', width: '100%', borderRadius: 2, overflow: 'hidden', marginTop: 2 }}>
          {locationError && (
            <Typography variant="h6" color="error" sx={{ textAlign: 'center', padding: 1 }}>
              {locationError}
            </Typography>
          )}

          <MapContainer
            center={[currentLocation.lat, currentLocation.lng]}
            zoom={13}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[equipment.latitude, equipment.longitude]}>
              <Popup>{equipment.name}</Popup>
            </Marker>
            <Marker position={currentLocation}>
              <Popup>Your current location</Popup>
            </Marker>
            <Polyline
              positions={[currentLocation, { lat: equipment.latitude, lng: equipment.longitude }]}
              color="blue"
              weight={4}
            />
          </MapContainer>
        </Box>

        {/* Show distance */}
        {distance !== null && (
          <CardContent sx={{ padding: 3 }}>
            <Typography variant="body2" color="textSecondary">
              Distance from your location: {Math.round(distance / 1000)} km
            </Typography>
          </CardContent>
        )}
      </Card>
    </Paper>
  );
};

export default EquipmentDetails;
