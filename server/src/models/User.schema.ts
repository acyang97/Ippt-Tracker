import { Schema, model } from "mongoose";
import { UserModel } from "../interfaces/user.interface";

const userSchema = new Schema<UserModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = model<UserModel>("User", userSchema);

export default User;
