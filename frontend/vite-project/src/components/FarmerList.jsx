import React, { useState, useEffect } from 'react';
import { getAllFarmers, deleteFarmer } from '../api/farmerService';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Grid,
    Container,
    Box,
    IconButton
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'; // Import ArrowBackIcon


const FarmerList = () => {
    const [farmers, setFarmers] = useState([
        { _id: '1', name: 'John Doe', email: 'john.doe@example.com' },
        { _id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
        { _id: '3', name: 'Robert Johnson', email: 'robert.johnson@example.com' },
    ]);
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                const data = await getAllFarmers();
                setFarmers(data);
            } catch (error) {
                console.error('Error fetching farmers:', error.message);
            }
        };

        fetchFarmers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this farmer?')) {
            try {
                await deleteFarmer(id);
                setFarmers(farmers.filter((farmer) => farmer._id !== id));
            } catch (error) {
                console.error('Error deleting farmer:', error.message);
            }
        }
    };

    return (
        <Container>
            
            <Box display="flex" justifyContent="space-between" style={{ marginBottom: '20px' }}>
            <IconButton
          edge="start"
          color="primary"
          onClick={() => navigate(-1)} // Go back to the previous page
          style={{ marginRight: '20px' }}
        >
          <ArrowBackIcon />
        </IconButton>
                <Button
                    component={Link}
                    to="/addFarmer"
                    variant="contained"
                    color="primary"
                >
                    Add Farmer
                </Button>
            </Box>
            <Grid container spacing={3}>
                {farmers.map((farmer) => (
                    <Grid item xs={12} sm={6} md={4} key={farmer._id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {farmer.name}
                                </Typography>
                                <Typography color="textSecondary">{farmer.email}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="error"
                                    onClick={() => handleDelete(farmer._id)}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default FarmerList;
