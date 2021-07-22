import { Followers } from "./Followers.interface";
import { Following } from "./Following.interface";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  followers?: IUser[];
  following?: IUser[];
}

export interface IHydratedUser extends IUser {
  followersListOfUser: Followers;
  followingListOfUser: Following;
}
