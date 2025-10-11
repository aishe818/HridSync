import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  medicalHistory: [String],
  allergies: [String],
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('UserProfile', userProfileSchema);