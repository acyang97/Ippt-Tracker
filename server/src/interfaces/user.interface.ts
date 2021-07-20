import { Document } from "mongoose";

export interface UserDoc extends Document {
  name: String;
  email: String;
  password: String;
  age: Number;
}
