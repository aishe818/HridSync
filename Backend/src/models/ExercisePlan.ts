import { Schema, model, models, Document } from 'mongoose';
export interface IExercisePlan extends Document {
  title: string;
  description: string;
  riskLevel?: string;
  createdAt: Date;
  updatedAt: Date;
}
const ExercisePlanSchema = new Schema<IExercisePlan>({ title: String, description: String, riskLevel: String }, { timestamps: true });

const ExercisePlan = models.ExercisePlan || model<IExercisePlan>('ExercisePlan', ExercisePlanSchema);
export default ExercisePlan;
