import { Schema, model, Document } from 'mongoose';
export interface IChatSession extends Document { user:any; nutritionist?:any; isWithNutritionist:boolean; createdAt:Date; updatedAt:Date; }
const ChatSessionSchema = new Schema<IChatSession>({ user:{type:Schema.Types.ObjectId, ref:'User', required:true}, nutritionist:{type:Schema.Types.ObjectId, ref:'User'}, isWithNutritionist:{type:Boolean, default:false} }, { timestamps:true });
export default model<IChatSession>('ChatSession', ChatSessionSchema);
