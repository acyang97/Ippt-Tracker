import { AlertActionTypes } from "../action-types/alert.action-types";
import { ErrorAlert } from "../interfaces/Alert.interface";

// I want this to contain the list of errors
const initialState: ErrorAlert[] = [];

function alertReducer(
  state = initialState,
  action: { type: any; payload: any }
) {
  const { type, payload } = action;
  switch (type) {
    case AlertActionTypes.SET_ALERT:
      return [...state, payload];
    case AlertActionTypes.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}

export default alertReducer;
