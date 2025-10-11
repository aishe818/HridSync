import mongoose from 'mongoose';

const nutritionistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specializations: [String],
  certifications: [{
    name: String,
    issuedBy: String,
    year: Number
  }],
  experience: Number,
  availability: [{
    day: String,
    slots: [{
      startTime: String,
      endTime: String
    }]
  }],
  rating: { type: Number, default: 0 },
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }]
});

export default mongoose.model('Nutritionist', nutritionistSchema);