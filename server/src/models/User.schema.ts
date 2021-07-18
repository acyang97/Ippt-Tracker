import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";

const userSchema = new Schema<User>({
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

const User = model<User>("User", userSchema);

export default User;
