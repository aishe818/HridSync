import { Schema, model, Document } from 'mongoose';
export interface IHealthLog extends Document { user:any; note:string; createdAt:Date; }
const HealthLogSchema = new Schema<IHealthLog>({ user:{type:Schema.Types.ObjectId, ref:'User', required:true}, note:String, createdAt:{type:Date, default:Date.now} });
export default model<IHealthLog>('HealthLog', HealthLogSchema);
