import { IUser } from "./User.interface";

export interface ITrainingSession {
  comments: TrainingSessionComment[];
  likes: IUser[];
  pushUps: number;
  sitUps: number;
  run: number;
  date: Date;
  userId: IUser;
}

export interface TrainingSessionComment {
  user: IUser;
  description: string;
  date: Date;
}

export interface TrainingSessionState {
  trainingSessions: ITrainingSession[];
}
