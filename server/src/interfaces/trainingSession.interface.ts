import { Document, Types } from "mongoose";
import { User } from "./user.interface";

export interface TrainingSession {
  userId: string;
  date: Date;
  pushUps: number;
  sitUps: number;
  run: number;
  points: number;
  likes: User[]; // for each one, we initalizew it as an empty array first
  comments: User[];
}

export interface TrainingSessionDoc extends Document, TrainingSession {
  _id: Types.ObjectId;
}

export type HydratedTrainingSession = TrainingSession & User;
