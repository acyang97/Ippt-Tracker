import { AlertActionTypes } from "../action-types/alert.action-types";

export interface SetAlertAction {
  type: AlertActionTypes.SET_ALERT;
  payload: { message: string; id: string; messageType: string };
}

export interface RemoveAlertAction {
  type: AlertActionTypes.REMOVE_ALERT;
  payload: { id: string };
}
