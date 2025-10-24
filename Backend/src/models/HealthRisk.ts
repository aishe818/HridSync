import { Schema, model, Document } from 'mongoose';
export interface IHealthRisk extends Document { user:any; assessment:any; riskScore:number; riskLevel:string; createdAt:Date; }
const HealthRiskSchema = new Schema<IHealthRisk>({ user:{type:Schema.Types.ObjectId, ref:'User', required:true}, assessment:{type:Schema.Types.ObjectId, ref:'HealthAssessment', required:true}, riskScore:Number, riskLevel:{type:String, enum:['low','medium','high'], required:true}, createdAt:{type:Date, default:Date.now} });
export default model<IHealthRisk>('HealthRisk', HealthRiskSchema);
