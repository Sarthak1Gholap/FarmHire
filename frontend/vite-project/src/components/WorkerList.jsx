import React, { useState, useEffect } from 'react';
import { getAllWorkers, deleteWorker } from '../api/workerService';
import { Card, CardContent, Button, Grid, Typography, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Leaflet library for marker customization
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'; // Import ArrowBackIcon
import { useNavigate } from 'react-router-dom'; // Import Link and useNavigate
const WorkerList = () => {
    const sampleWorkers = [
        {
            _id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            hourlyRate: 20,
            location: { latitude: 40.7128, longitude: -74.0060 },
        },
        {
            _id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            hourlyRate: 25,
            location: { latitude: 34.0522, longitude: -118.2437 },
        },
        {
            _id: '3',
            name: 'Michael Brown',
            email: 'michael@example.com',
            hourlyRate: 30,
            location: { latitude: 51.5074, longitude: -0.1278 },
        },
    ];

    const [workers, setWorkers] = useState([]);
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const data = await getAllWorkers(); // Fetch workers from API
                if (Array.isArray(data)) {
                    setWorkers(data);
                } else {
                    console.error('Fetched data is not an array:', data);
                    setWorkers(sampleWorkers); // Fallback to sample data
                }
            } catch (error) {
                console.error('Error fetching workers:', error.message);
                setWorkers(sampleWorkers); // Fallback to sample data in case of an error
            }
        };

        fetchWorkers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this worker?')) {
            try {
                await deleteWorker(id);
                setWorkers(workers.filter((worker) => worker._id !== id));
            } catch (error) {
                console.error('Error deleting worker:', error.message);
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
                    to="/addWorker"
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: '20px' }}
                >
                    Add Worker
                </Button>
            </Box>

            <Grid container spacing={2}>
                {workers.length === 0 ? (
                    <Typography variant="h6">No workers available</Typography>
                ) : (
                    workers.map((worker) => (
                        <Grid item xs={12} sm={6} md={4} key={worker._id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{worker.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {worker.email}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Hourly Rate: ${worker.hourlyRate}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Location:
                                    </Typography>

                                    {/* Leaflet Map displaying worker location */}
                                    <div style={{ height: '200px', width: '100%' }}>
                                        <MapContainer
                                            center={[worker.location.latitude, worker.location.longitude]}
                                            zoom={13}
                                            style={{ height: '100%', width: '100%' }}
                                        >
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker
                                                position={[worker.location.latitude, worker.location.longitude]}
                                            >
                                                <Popup>{worker.name}'s Location</Popup>
                                            </Marker>
                                        </MapContainer>
                                    </div>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(worker._id)}
                                        style={{ marginTop: '10px' }}
                                    >
                                        Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default WorkerList;
