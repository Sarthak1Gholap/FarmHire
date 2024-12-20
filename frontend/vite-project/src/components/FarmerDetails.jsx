import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFarmerById } from '../api/farmerService';

const FarmerDetails = () => {
  const { id } = useParams();
  const [farmer, setFarmer] = useState(null);

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const data = await getFarmerById(id);
        setFarmer(data);
      } catch (error) {
        console.error('Error fetching farmer details:', error.message);
      }
    };

    fetchFarmer();
  }, [id]);

  if (!farmer) return <p>Loading...</p>;

  return (
    <div>
      <h2>Farmer Details</h2>
      <p>Name: {farmer.name}</p>
      <p>Email: {farmer.email}</p>
    </div>
  );
};

export default FarmerDetails;
