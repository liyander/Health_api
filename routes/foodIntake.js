const express = require('express');
const router = express.Router();
const FoodIntake = require('../schemas/FoodIntake');

// Get all food intake records for a patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const records = await FoodIntake.find({ patient: req.params.patientId })
      .sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific food intake record
router.get('/:id', async (req, res) => {
  try {
    const record = await FoodIntake.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Food intake record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new food intake record
router.post('/', async (req, res) => {
  const record = new FoodIntake({
    patient: req.body.patient,
    mealType: req.body.mealType,
    foodItems: req.body.foodItems,
    carbohydrates: req.body.carbohydrates,
    proteins: req.body.proteins,
    fats: req.body.fats,
    calories: req.body.calories,
    notes: req.body.notes
  });

  try {
    const newRecord = await record.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a food intake record
router.patch('/:id', async (req, res) => {
  try {
    const record = await FoodIntake.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Food intake record not found' });
    }

    const updateFields = [
      'mealType', 'foodItems', 'carbohydrates', 'proteins',
      'fats', 'calories', 'notes'
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

// Delete a food intake record
router.delete('/:id', async (req, res) => {
  try {
    const record = await FoodIntake.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Food intake record not found' });
    }
    await record.remove();
    res.json({ message: 'Food intake record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
