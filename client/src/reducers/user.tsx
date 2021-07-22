import { UserActionTypes } from "../action-types/user.action-types";
import { IHydratedUser } from "../interfaces/User.interface";

export interface UserState {
  users: IHydratedUser[];
}

// to contain the list of user
const initialState: UserState = {
  users: [],
};

function UserReducer(
  state = initialState,
  action: { type: any; payload: any }
) {
  const { type, payload } = action;
  switch (type) {
    case UserActionTypes.FIND_USERS:
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
}

export default UserReducer;
