// workerService.js

import axios from 'axios';

const API_URL = '/api/workers';

// Fetch all workers
export const getAllWorkers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Hire a new worker
export const hireWorker = async (newWorker) => {
  await axios.post(`${API_URL}/hire`, newWorker);
};

// Delete a worker by ID
export const deleteWorker = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
