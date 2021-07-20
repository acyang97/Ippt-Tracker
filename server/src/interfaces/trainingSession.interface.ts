import { Document } from "mongoose";
import { UserDoc } from "./user.interface";

export interface TrainingSession extends Document {
  userId: String;
  date: Date;
  pushUps: Number;
  sitUps: Number;
  run: Number;
  points: Number;
  likes: UserDoc[]; // for each one, we initalizew it as an empty array first
  comments: UserDoc[];
}
