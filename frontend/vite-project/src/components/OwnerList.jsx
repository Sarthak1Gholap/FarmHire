import React, { useState, useEffect } from 'react';
import { getAllOwners, deleteOwner } from '../api/ownerService';
import { Card, CardContent, Button, Grid, Typography, Box, Link, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'; // Import ArrowBackIcon


const OwnerList = () => {
    const [owners, setOwners] = useState([]);
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        const fetchOwners = async () => {
            // Simulating fetching data, replace with your API call later
            const customOwners = [
                { _id: '1', name: 'John Doe', email: 'johndoe@example.com' },
                { _id: '2', name: 'Jane Smith', email: 'janesmith@example.com' },
                { _id: '3', name: 'Robert Brown', email: 'robertbrown@example.com' },
                { _id: '4', name: 'Emily Johnson', email: 'emilyj@example.com' },
            ];


            setOwners(customOwners);

            // Uncomment and use this to fetch data from API
            // try {
            //   const data = await getAllOwners();
            //   setOwners(data);
            // } catch (error) {
            //   console.error('Error fetching owners:', error.message);
            // }
        };

        fetchOwners();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this owner?')) {
            try {
                await deleteOwner(id);
                setOwners(owners.filter((owner) => owner._id !== id));
            } catch (error) {
                console.error('Error deleting owner:', error.message);
            }
        }
    };

    return (
        <Box>

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
                    to="/addOwner"
                    variant="contained"
                    color="primary"
                >
                    Add Owner
                </Button>
            </Box>
            <Grid container spacing={2}>
                {owners.map((owner) => (
                    <Grid item xs={12} sm={6} md={4} key={owner._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{owner.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {owner.email}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(owner._id)}
                                    style={{ marginTop: '10px' }}
                                >
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default OwnerList;
