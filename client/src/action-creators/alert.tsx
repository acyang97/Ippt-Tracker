import { Dispatch } from "redux";
import { v4 as uuidv4 } from "uuid";
import { AlertActionTypes } from "../action-types/alert.action-types";

export const setAlert =
  (message: string, timeout = 5000) =>
  (dispatch: Dispatch) => {
    const id = uuidv4();
    dispatch({
      type: AlertActionTypes.SET_ALERT,
      payload: { message, id },
    });

    setTimeout(
      () => dispatch({ type: AlertActionTypes.REMOVE_ALERT, payload: id }),
      timeout
    );
  };
