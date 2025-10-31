import { Schema, model, models, Document } from 'mongoose';

export interface IChatMessage extends Document {
  session: any;
  sender: 'user' | 'nutritionist' | 'system';
  text: string;
  createdAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>({
  session: { type: Schema.Types.ObjectId, ref: 'ChatSession', required: true },
  sender: { type: String, enum: ['user', 'nutritionist', 'system'], required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Safe model initialization
const ChatMessage =
  models.ChatMessage || model<IChatMessage>('ChatMessage', ChatMessageSchema);

export default ChatMessage;
