import { Dispatch } from "redux";
import { v4 as uuidv4 } from "uuid";
import { AlertActionTypes } from "../action-types/alert.action-types";
import { RemoveAlertAction, SetAlertAction } from "../actions/alert.actions";

export const setAlert =
  (message: string, timeout = 5000) =>
  (dispatch: Dispatch<RemoveAlertAction | SetAlertAction>) => {
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
