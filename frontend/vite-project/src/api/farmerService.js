import axios from 'axios';

const API_URL = 'http://localhost:5000/api/farmers'; // Adjust if needed

export const getAllFarmers = async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const getFarmerById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const deleteFarmer = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};



// Add a new farmer
export const addFarmer = async (farmerData) => {
  try {
    const response = await axios.post(API_URL, farmerData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

