import { Document, Types } from "mongoose";
import { User } from "./user.interface";

export interface Following {
  userId: string;
  following?: User[];
}

export interface FollowingDoc extends Document, Following {
  _id: Types.ObjectId;
}
