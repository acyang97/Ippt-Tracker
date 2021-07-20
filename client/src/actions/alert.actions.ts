import { AlertActionTypes } from "../action-types/alert.action-types";

export interface SetAlertAction {
  type: AlertActionTypes.SET_ALERT;
}

export interface RemoveAlertAction {
  type: AlertActionTypes.REMOVE_ALERT;
}
