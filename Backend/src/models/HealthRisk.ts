import { Schema, model, models, Document } from 'mongoose';
export interface IHealthRisk extends Document {
  user: any;
  assessment: any;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}
const HealthRiskSchema = new Schema<IHealthRisk>({ user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, assessment: { type: Schema.Types.ObjectId, ref: 'HealthAssessment', required: true }, riskScore: Number, riskLevel: { type: String, enum: ['low', 'medium', 'high'], required: true } }, { timestamps: true });

const HealthRisk = models.HealthRisk || model<IHealthRisk>('HealthRisk', HealthRiskSchema);
export default HealthRisk;
