import { Document, Types } from "mongoose";
import { User } from "./user.interface";

export interface TrainingSession {
  userId: string;
  date: Date;
  pushUps: number;
  sitUps: number;
  run: number;
  ipptPoints: IpptPoints;
  likes: User[]; // for each one, we initalizew it as an empty array first
  comments: User[];
}

export interface IpptPoints {
  sitUpsPoints: number;
  pushUpsPoints: number;
  runPoints: number;
  totalPoints: number;
  result: IpptResult;
}

export enum IpptResult {
  GOLD = "Gold",
  SILVER = "Silver",
  PASS = "Pass",
  PASS_NSMEN = "Pass*",
  FAIL = "Fail",
}

export interface TrainingSessionDoc extends Document, TrainingSession {
  _id: Types.ObjectId;
}

export type HydratedTrainingSession = TrainingSession & {
  name: string;
  email: string;
  age: number;
};
