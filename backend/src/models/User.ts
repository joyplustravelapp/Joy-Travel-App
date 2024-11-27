import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  favoriteActivities: string[];
  favoriteDestinations: string[];
  travelCompanions: string;
  tripFrequency: string;
  travelMemory: string;
  languagesSpoken: string[];
  socialMediaLinks: { instagram: string; tiktok: string };
}

const userSchema: Schema = new mongoose.Schema({
  fullName: { type: String },
  username: { type: String, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  favoriteActivities: { type: [String], default: [] },
  favoriteDestinations: { type: [String], default: [] },
  travelCompanions: { type: String },
  tripFrequency: { type: String },
  travelMemory: { type: String },
  languagesSpoken: { type: [String], default: [] },
  socialMediaLinks: { instagram: { type: String }, tiktok: { type: String } },
});

export default mongoose.model<IUser>("User", userSchema);
