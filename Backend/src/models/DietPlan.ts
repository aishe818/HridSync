import { Schema, model, Document } from 'mongoose';
export interface IDietPlan extends Document { title:string; riskLevel:string; description:string; createdAt:Date; }
const DietPlanSchema = new Schema<IDietPlan>({ title:String, riskLevel:{type:String, enum:['low','medium','high']}, description:String, createdAt:{type:Date, default:Date.now} });
export default model<IDietPlan>('DietPlan', DietPlanSchema);
