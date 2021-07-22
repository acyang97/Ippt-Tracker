import { IUser } from "./User.interface";

export interface Followers {
  userId: string;
  followers: IUser[];
}
