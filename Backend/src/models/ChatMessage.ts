import { Schema, model, Document } from 'mongoose';
export interface IChatMessage extends Document { session:any; sender:string; text:string; createdAt:Date; }
const ChatMessageSchema = new Schema<IChatMessage>({ session:{type:Schema.Types.ObjectId, ref:'ChatSession', required:true}, sender:{type:String, enum:['user','nutritionist','system'], required:true}, text:{type:String, required:true}, createdAt:{type:Date, default:Date.now} });
export default model<IChatMessage>('ChatMessage', ChatMessageSchema);
