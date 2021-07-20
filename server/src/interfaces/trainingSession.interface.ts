import { Document } from "mongoose";
import { User, UserModel } from "./user.interface";

export interface TrainingSession {
  date: Date;
  pushUps: Number;
  sitUps: Number;
  "2.4km": Number;
  likes: UserModel;
  comments: UserModel;
}

export type TrainingSessionModel = TrainingSession & Document;
