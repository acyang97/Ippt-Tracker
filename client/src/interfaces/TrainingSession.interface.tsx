import { IUser } from "./User.interface";

export interface ITrainingSession {
  _id: string;
  comments: TrainingSessionComment[];
  likes: IUser[];
  pushUps: number;
  sitUps: number;
  run: number;
  date: Date;
  userId: IUser;
  points: number;
}

export interface TrainingSessionComment {
  user: IUser;
  description: string;
  date: Date;
}
