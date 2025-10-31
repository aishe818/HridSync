import { Schema, model, models, Document } from 'mongoose';
export interface IProgress extends Document {
  user: any;
  timeline: any[];
  createdAt: Date;
  updatedAt: Date;
}
const ProgressSchema = new Schema<IProgress>({ user:{type:Schema.Types.ObjectId, ref:'User', required:true}, timeline:[Schema.Types.Mixed] }, { timestamps:true });

const Progress = models.Progress || model<IProgress>('Progress', ProgressSchema);
export default Progress;
