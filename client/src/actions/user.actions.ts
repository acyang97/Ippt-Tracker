import { UserActionTypes } from "../action-types/user.action-types";
import { IUser } from "../interfaces/User.interface";

export interface FindUsersAction {
  type: UserActionTypes.FIND_USERS;
  payload: IUser[];
}
