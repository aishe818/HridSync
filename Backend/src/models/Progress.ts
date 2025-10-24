import { Schema, model, Document } from 'mongoose';
export interface IProgress extends Document { user:any; timeline:any[]; createdAt:Date; }
const ProgressSchema = new Schema<IProgress>({ user:{type:Schema.Types.ObjectId, ref:'User', required:true}, timeline:[Schema.Types.Mixed] }, { timestamps:true });
export default model<IProgress>('Progress', ProgressSchema);
