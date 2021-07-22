import { Document, Types } from "mongoose";
import { User } from "./user.interface";

export interface Followers {
  userId: string;
  followers?: User[];
}

export interface FollowersDoc extends Document, Followers {
  _id: Types.ObjectId;
}
