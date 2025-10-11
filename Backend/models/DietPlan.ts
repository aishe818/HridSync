import mongoose from 'mongoose';

const dietPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meals: [{
    type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
    foods: [{
      name: String,
      portion: String,
      calories: Number
    }]
  }],
  totalCalories: Number,
  restrictions: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('DietPlan', dietPlanSchema);