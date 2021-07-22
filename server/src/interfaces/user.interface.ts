import { Document, Types } from "mongoose";
import { Request } from "express";

export interface User {
  name: string;
  email: string;
  password: string;
  age: number;
  followers?: User[];
  following?: User[];
}

export interface UserDoc extends Document, User {
  _id: Types.ObjectId;
}

export interface UserAuthRequest extends Request {
  user: UserDoc;
}
