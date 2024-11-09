// src/models/User.ts

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
}

// Define the User schema
const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
