const express = require('express');
const router = express.Router();
const GlucoseReading = require('../schemas/GlucoseReading');

// Get all glucose readings for a patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const readings = await GlucoseReading.find({ patient: req.params.patientId })
      .sort({ createdAt: -1 });
    res.json(readings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific glucose reading
router.get('/:id', async (req, res) => {
  try {
    const reading = await GlucoseReading.findById(req.params.id);
    if (!reading) {
      return res.status(404).json({ message: 'Glucose reading not found' });
    }
    res.json(reading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new glucose reading
router.post('/', async (req, res) => {
  const reading = new GlucoseReading({
    patient: req.body.patient,
    glucoseLevel: req.body.glucoseLevel,
    readingType: req.body.readingType,
    notes: req.body.notes
  });

  try {
    const newReading = await reading.save();
    res.status(201).json(newReading);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a glucose reading
router.patch('/:id', async (req, res) => {
  try {
    const reading = await GlucoseReading.findById(req.params.id);
    if (!reading) {
      return res.status(404).json({ message: 'Glucose reading not found' });
    }

    if (req.body.glucoseLevel != null) {
      reading.glucoseLevel = req.body.glucoseLevel;
    }
    if (req.body.readingType != null) {
      reading.readingType = req.body.readingType;
    }
    if (req.body.notes != null) {
      reading.notes = req.body.notes;
    }

    const updatedReading = await reading.save();
    res.json(updatedReading);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a glucose reading
router.delete('/:id', async (req, res) => {
  try {
    const reading = await GlucoseReading.findById(req.params.id);
    if (!reading) {
      return res.status(404).json({ message: 'Glucose reading not found' });
    }
    await reading.remove();
    res.json({ message: 'Glucose reading deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
