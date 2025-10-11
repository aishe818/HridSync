import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weight: Number,
  bloodPressure: {
    systolic: Number,
    diastolic: Number
  },
  cholesterol: Number,
  exercise: {
    type: String,
    duration: Number,
    calories: Number
  },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Progress', progressSchema);