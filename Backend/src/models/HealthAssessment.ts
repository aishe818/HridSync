import { Schema, model, Document } from 'mongoose';
export interface IHealthAssessment extends Document { user:any; systolic:number; diastolic:number; cholesterol:number; diabetes:boolean; smoker:boolean; activityLevel:string; createdAt:Date; }
const HealthAssessmentSchema = new Schema<IHealthAssessment>({ user:{type:Schema.Types.ObjectId, ref:'User', required:true}, systolic:Number, diastolic:Number, cholesterol:Number, diabetes:Boolean, smoker:Boolean, activityLevel:{type:String, enum:['low','moderate','high'], default:'moderate'}, createdAt:{type:Date, default:Date.now} });
export default model<IHealthAssessment>('HealthAssessment', HealthAssessmentSchema);
