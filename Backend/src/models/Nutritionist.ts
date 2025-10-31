import { Schema, model, models, Document } from 'mongoose';
export interface INutritionist extends Document {
  user: any;
  bio?: string;
  specialties?: string[];
  yearsExperience?: number;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}
const NutritionistSchema = new Schema<INutritionist>({ user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, bio: String, specialties: [String], yearsExperience: Number, rating: Number }, { timestamps: true });

const Nutritionist = models.Nutritionist || model<INutritionist>('Nutritionist', NutritionistSchema);
export default Nutritionist;
