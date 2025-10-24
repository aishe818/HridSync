import { Schema, model, Document } from 'mongoose';
export interface IHealthMetrics extends Document { user:any; metrics:Record<string, any>; createdAt:Date; }
const HealthMetricsSchema = new Schema<IHealthMetrics>({ user:{type:Schema.Types.ObjectId, ref:'User', required:true}, metrics:{type:Schema.Types.Mixed, default:{}}, createdAt:{type:Date, default:Date.now} });
export default model<IHealthMetrics>('HealthMetrics', HealthMetricsSchema);
