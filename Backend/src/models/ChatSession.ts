import { Schema, model, models, Document } from 'mongoose';

export interface IChatSession extends Document {
  user: any;
  nutritionist?: any;
  isWithNutritionist: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSessionSchema = new Schema<IChatSession>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    nutritionist: { type: Schema.Types.ObjectId, ref: 'User' },
    isWithNutritionist: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const ChatSession =
  models.ChatSession || model<IChatSession>('ChatSession', ChatSessionSchema);

export default ChatSession;
