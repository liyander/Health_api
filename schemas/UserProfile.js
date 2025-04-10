const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ProfileSchema = new Schema({
  username: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  height: { type: Number, min: 0 },
  weight: { type: Number, min: 0 },
  bloodType: { type: String, maxLength: 10 },
  medicalConditions: { type: String, default: '' },
  allergies: { type: String, default: '' },
  medications: { type: String, default: '' },
  emergencyContactName: { type: String, maxLength: 255, default: '' },
  emergencyContactNumber: { type: String, maxLength: 20, default: '' }
}, { timestamps: true });

module.exports = model('Profile', ProfileSchema);
