import { Document } from "mongoose";

export interface User {
  name: String;
  email: String;
  password: String;
  age: Number;
}

export type UserModel = User & Document;
