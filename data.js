const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true, // Required to identify the user
  },
  patientName: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  medicines: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  heartRate: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  accessPolicy: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;