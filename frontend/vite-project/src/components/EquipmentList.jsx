import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Grid, Typography, CardMedia, CardActions, IconButton, Box } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import HireEquipment from './HireEquipment'; // Import HireEquipment component
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'; // Import ArrowBackIcon

const EquipmentList = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get('/api/equipment');
        if (response.data.length > 0) {
          setEquipmentList([
            {
              _id: '1',
              name: 'Excavator',
              description: 'Heavy-duty excavator for construction work',
              rentalPrice: 150,
              image: 'https://via.placeholder.com/150?text=Excavator',
            },
            {
              _id: '2',
              name: 'Forklift',
              description: 'Forklift for warehouse and logistics use',
              rentalPrice: 100,
              image: 'https://via.placeholder.com/150?text=Forklift',
            },
            {
              _id: '3',
              name: 'Generator',
              description: 'Portable generator for power supply',
              rentalPrice: 75,
              image: 'https://via.placeholder.com/150?text=Generator',
            },
          ]); // Set data from API
        } else {
          // Fallback custom data
          setEquipmentList([
            {
              _id: '1',
              name: 'Excavator',
              description: 'Heavy-duty excavator for construction work',
              rentalPrice: 150,
              image: 'https://via.placeholder.com/150?text=Excavator',
            },
            {
              _id: '2',
              name: 'Forklift',
              description: 'Forklift for warehouse and logistics use',
              rentalPrice: 100,
              image: 'https://via.placeholder.com/150?text=Forklift',
            },
            {
              _id: '3',
              name: 'Generator',
              description: 'Portable generator for power supply',
              rentalPrice: 75,
              image: 'https://via.placeholder.com/150?text=Generator',
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching equipment', error);
        // Fallback custom data in case of error
        setEquipmentList([
          {
            _id: '1',
            name: 'Excavator',
            description: 'Heavy-duty excavator for construction work',
            rentalPrice: 150,
            image: 'https://via.placeholder.com/150?text=Excavator',
          },
          {
            _id: '2',
            name: 'Forklift',
            description: 'Forklift for warehouse and logistics use',
            rentalPrice: 100,
            image: 'https://via.placeholder.com/150?text=Forklift',
          },
          {
            _id: '3',
            name: 'Generator',
            description: 'Portable generator for power supply',
            rentalPrice: 75,
            image: 'https://via.placeholder.com/150?text=Generator',
          },
        ]);
      }
    };
    fetchEquipment();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {/* Header with Back Button and Add Equipment Button */}
      

      <Box display="flex" justifyContent="space-between" style={{ marginBottom: '20px' }}>
      <IconButton
          edge="start"
          color="primary"
          onClick={() => navigate(-1)} // Go back to the previous page
          style={{ marginRight: '20px' }}
        >
          <ArrowBackIcon />
        </IconButton>

                {/* Add Equipment Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/addEquipment')}
        >
          Add Equipment
        </Button>
            </Box>

      {/* Equipment Cards Grid */}
      <Grid container spacing={3}>
        {equipmentList.map((equipment) => (
          <Grid item xs={12} sm={6} md={4} key={equipment._id}>
            <Link to={`/equipment/${equipment._id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={equipment.image || 'default-image-url.jpg'}
                  alt={equipment.name}
                />
                <CardContent>
                  <Typography variant="h6">{equipment.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {equipment.description}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    ${equipment.rentalPrice} per day
                  </Typography>
                </CardContent>
                <CardActions>
                  <HireEquipment id={equipment._id} />
                </CardActions>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EquipmentList;
