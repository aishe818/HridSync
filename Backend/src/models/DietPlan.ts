import { Schema, model, models, Document } from 'mongoose';
export interface IDietPlan extends Document {
  title: string;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
const DietPlanSchema = new Schema<IDietPlan>({ title: String, riskLevel: { type: String, enum: ['low', 'medium', 'high'] }, description: String }, { timestamps: true });

const DietPlan = models.DietPlan || model<IDietPlan>('DietPlan', DietPlanSchema);
export default DietPlan;
