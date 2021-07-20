import { Schema, model } from "mongoose";
import { UserDoc } from "../interfaces/user.interface";

const userSchema = new Schema<UserDoc>({
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

const UserModel = model<UserDoc>("User", userSchema);

export default UserModel;
