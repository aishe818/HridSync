import { Schema, model, models, Document } from 'mongoose';
export interface IHealthMetrics extends Document {
  user: any;
  metrics: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
const HealthMetricsSchema = new Schema<IHealthMetrics>({ user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, metrics: { type: Schema.Types.Mixed, default: {} } }, { timestamps: true });

const HealthMetrics = models.HealthMetrics || model<IHealthMetrics>('HealthMetrics', HealthMetricsSchema);
export default HealthMetrics;
