import { Schema, model, Document } from 'mongoose';
export interface INutritionist extends Document { user:any; bio?:string; specialties?:string[]; yearsExperience?:number; rating?:number; }
const NutritionistSchema = new Schema<INutritionist>({ user:{type:Schema.Types.ObjectId, ref:'User', required:true}, bio:String, specialties:[String], yearsExperience:Number, rating:Number });
export default model<INutritionist>('Nutritionist', NutritionistSchema);
