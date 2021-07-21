import { IUser } from "./User.interface";

export interface ITrainingSession {
  _id: string;
  comments: TrainingSessionComment[];
  likes: IUser[];
  pushUps: number;
  sitUps: number;
  run: number;
  date: Date;
  user: IUser;
  userId: string;
  ipptPoints: IpptPoints;
}

export interface IHydratedTrainingSession extends ITrainingSession {
  name: string;
  email: string;
  age: number;
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

export interface TrainingSessionComment {
  user: IUser;
  description: string;
  date: Date;
}
