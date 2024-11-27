import mongoose, { Document, Schema } from "mongoose";
import User from "./User";
import { IUser } from "./User";
import { types } from "util";

export interface IPlan {
  _id: string;
  planName: string;
  email: string;
  planImage: string;
  from: Date;
  to: Date;
  location: string;
  companions: IUser[];
  planDescription: string;
  interests: string[];
  destinations: string[];
}

const planSchema: Schema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => value.length <= 20,
      message: "Can have at most 20 characters.",
    },
  },
  location: { type: String, required: true },
  companions: [{ type: Schema.Types.ObjectId, ref: "User" }],
  email: { type: String, required: true },
  planImage: { type: String },
  interests: {
    type: [String],
    default: [],
    validate: {
      validator: (value: string[]) => value.length <= 5,
      message: "The interests array can have at most 5 strings.",
    },
  },
  destinations: { type: [String], default: [], required: true },
  planDescription: { type: String },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
});

// Set autoIndex to true
planSchema.set("autoIndex", true);

// Create a compound index for (email, planName) to be unique
planSchema.index({ email: 1, planName: 1 }, { unique: true });

export default mongoose.model<IPlan>("Plan", planSchema);
