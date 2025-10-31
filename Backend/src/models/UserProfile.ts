import { Schema, model, models, Document } from 'mongoose';
export interface IUserProfile extends Document {
  user: any;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  bmi?: number;
  createdAt: Date;
  updatedAt: Date;
}
const UserProfileSchema = new Schema<IUserProfile>({ user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, age: Number, gender: String, height: Number, weight: Number, bmi: Number }, { timestamps: true });

const UserProfile = models.UserProfile || model<IUserProfile>('UserProfile', UserProfileSchema);
export default UserProfile;
