const Worker = require('../models/Worker');

// Get all workers (accessible by farmers and owners)
const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get worker by ID
const getWorkerById = async (req, res) => {
  const { id } = req.params;

  try {
    const worker = await Worker.findById(id);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Placeholder for hireWorker (add your logic here)
const hireWorker = async (req, res) => {
  const { workerId, farmerId } = req.body;

  // Add logic to hire worker by linking them to a farmer

  res.status(200).json({ message: 'Worker hired successfully' });
};

// Placeholder for deleteWorker (only owner or the worker themselves can delete)
const deleteWorker = async (req, res) => {
  const { id } = req.params;

  try {
    const worker = await Worker.findByIdAndDelete(id);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.status(200).json({ message: 'Worker deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllWorkers, getWorkerById, hireWorker, deleteWorker };
