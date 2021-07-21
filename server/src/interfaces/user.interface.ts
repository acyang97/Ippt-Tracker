import { Document, Types } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface UserDoc extends Document, User {
  _id: Types.ObjectId;
}
