const express = require('express');
const { getAllWorkers, getWorkerById, hireWorker, deleteWorker } = require('../controllers/workerController');
const router = express.Router();
const checkRole = require('../middleware/authMiddleware');

// Get all workers (Accessible by `farmer` and `owner`)
router.get('/', checkRole('farmer', 'owner'), getAllWorkers);

// Hire a worker (Accessible by `farmer` and `owner`)
router.post('/hire', checkRole('farmer', 'owner'), hireWorker);

// Delete a worker (Only the worker themselves or an owner can delete)
router.delete('/:id', checkRole('owner', 'worker'), deleteWorker);

// Get worker by ID
router.get('/:id', getWorkerById);

module.exports = router;
