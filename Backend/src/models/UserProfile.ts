import { Schema, model, Document } from 'mongoose';
export interface IUserProfile extends Document { user:any; age?:number; gender?:string; height?:number; weight?:number; bmi?:number; createdAt: Date; }
const UserProfileSchema = new Schema<IUserProfile>({ user:{type:Schema.Types.ObjectId, ref:'User', required:true}, age:Number, gender:String, height:Number, weight:Number, bmi:Number, createdAt:{type:Date, default:Date.now} });
export default model<IUserProfile>('UserProfile', UserProfileSchema);
