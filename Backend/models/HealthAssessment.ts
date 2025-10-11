import mongoose from 'mongoose';

const healthAssessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: Number,
  gender: String,
  bloodPressure: {
    systolic: Number,
    diastolic: Number
  },
  cholesterol: Number,
  bloodSugar: Number,
  weight: Number,
  height: Number,
  smokingStatus: Boolean,
  alcoholConsumption: String,
  physicalActivity: String,
  familyHistory: Boolean,
  assessmentDate: { type: Date, default: Date.now }
});

export default mongoose.model('HealthAssessment', healthAssessmentSchema);