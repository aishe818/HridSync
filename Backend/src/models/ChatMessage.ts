import { Schema, model, Document } from 'mongoose';

export interface IChatSession extends Document {
  user: any;
  nutritionist: any;
  startedAt: Date;
  active: boolean;
}

const ChatSessionSchema = new Schema<IChatSession>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  nutritionist: { type: Schema.Types.ObjectId, ref: 'Nutritionist', required: true },
  startedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

export default model<IChatSession>('ChatSession', ChatSessionSchema);
