import axios from "axios";
import { Dispatch } from "redux";
import { UserActionTypes } from "../action-types/user.action-types";
import { FindUsersAction, FollowUserAction } from "../actions/user.actions";
import { ErrorAlert } from "../interfaces/Alert.interface";
import { setAlert } from "./alert";

export const findUsers = () => async (dispatch: Dispatch<FindUsersAction>) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get("/ippt-tracker/users", config);
    dispatch({
      type: UserActionTypes.FIND_USERS,
      payload: res.data, // the users
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: ErrorAlert) =>
        dispatch(setAlert(error.message, "error") as any)
      );
    }
  }
};

export const followUser =
  (userIdOfUserToFollow: string) =>
  async (dispatch: Dispatch<FollowUserAction>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await axios.post(
        `/ippt-tracker/users/follow/${userIdOfUserToFollow}`,
        config
      );
      // dispatch({
      //   type: UserActionTypes.FIND_USERS,
      //   payload: res.data, // the updated users
      // });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error: ErrorAlert) =>
          dispatch(setAlert(error.message, "error") as any)
        );
      }
    }
  };
