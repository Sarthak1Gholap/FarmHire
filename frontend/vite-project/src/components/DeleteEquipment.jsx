import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Grid, Typography, CardMedia } from '@mui/material';
import axios from 'axios';

const EquipmentList = () => {
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get('/api/equipment');
        if (Array.isArray(response.data) && response.data.length > 0) {
          setEquipmentList(response.data);
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
    <Grid container spacing={3}>
      {Array.isArray(equipmentList) &&
        equipmentList.map((equipment) => (
          <Grid item xs={12} sm={6} md={4} key={equipment._id}>
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
              <Button variant="contained" color="primary" fullWidth>
                Hire
              </Button>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default EquipmentList;
