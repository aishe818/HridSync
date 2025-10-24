import { Schema, model, Document } from 'mongoose';
export interface IExercisePlan extends Document { title:string; description:string; riskLevel?:string; createdAt:Date; }
const ExercisePlanSchema = new Schema<IExercisePlan>({ title:String, description:String, riskLevel:String, createdAt:{type:Date, default:Date.now} });
export default model<IExercisePlan>('ExercisePlan', ExercisePlanSchema);
