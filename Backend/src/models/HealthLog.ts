import { Schema, model, models, Document } from 'mongoose';
export interface IHealthLog extends Document {
  user: any;
  note: string;
  createdAt: Date;
  updatedAt: Date;
}
const HealthLogSchema = new Schema<IHealthLog>({ user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, note: String }, { timestamps: true });

const HealthLog = models.HealthLog || model<IHealthLog>('HealthLog', HealthLogSchema);
export default HealthLog;
