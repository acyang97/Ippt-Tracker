import { IUser } from "./User.interface";

export interface Following {
  userId: string;
  following: IUser[];
}
