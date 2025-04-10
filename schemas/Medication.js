const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MedicationSchema = new Schema({
  profileId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  prescribedBy: { type: String },
  purpose: { type: String },
  sideEffects: { type: [String], default: [] },
  active: { type: Boolean, default: true },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = model('Medication', MedicationSchema);
