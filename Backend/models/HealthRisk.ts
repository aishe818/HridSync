import mongoose from 'mongoose';

const healthRiskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  riskLevel: { type: String, enum: ['low', 'moderate', 'high'], required: true },
  riskFactors: [{
    factor: String,
    severity: String,
    recommendations: [String]
  }],
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('HealthRisk', healthRiskSchema);