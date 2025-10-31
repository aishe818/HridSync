import { Schema, model, models, Document } from 'mongoose';
export interface IHealthAssessment extends Document {
  user: any;
  systolic: number;
  diastolic: number;
  cholesterol: number;
  diabetes: boolean;
  smoker: boolean;
  activityLevel: 'low' | 'moderate' | 'high';
  createdAt: Date;
  updatedAt: Date;
}
const HealthAssessmentSchema = new Schema<IHealthAssessment>({ user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, systolic: Number, diastolic: Number, cholesterol: Number, diabetes: Boolean, smoker: Boolean, activityLevel: { type: String, enum: ['low', 'moderate', 'high'], default: 'moderate' } }, { timestamps: true });

const HealthAssessment = models.HealthAssessment || model<IHealthAssessment>('HealthAssessment', HealthAssessmentSchema);
export default HealthAssessment;
