const express = require('express');
const router = express.Router();
const InsulinRecord = require('../schemas/InsulinRecord');

// Get all insulin records for a patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const records = await InsulinRecord.find({ patient: req.params.patientId })
      .sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific insulin record
router.get('/:id', async (req, res) => {
  try {
    const record = await InsulinRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Insulin record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new insulin record
router.post('/', async (req, res) => {
  const record = new InsulinRecord({
    patient: req.body.patient,
    insulinType: req.body.insulinType,
    dosage: req.body.dosage,
    injectionSite: req.body.injectionSite,
    notes: req.body.notes
  });

  try {
    const newRecord = await record.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an insulin record
router.patch('/:id', async (req, res) => {
  try {
    const record = await InsulinRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Insulin record not found' });
    }

    const updateFields = [
      'insulinType', 'dosage', 'injectionSite', 'notes'
    ];

    updateFields.forEach(field => {
      if (req.body[field] != null) {
        record[field] = req.body[field];
      }
    });

    const updatedRecord = await record.save();
    res.json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an insulin record
router.delete('/:id', async (req, res) => {
  try {
    const record = await InsulinRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Insulin record not found' });
    }
    await record.remove();
    res.json({ message: 'Insulin record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
