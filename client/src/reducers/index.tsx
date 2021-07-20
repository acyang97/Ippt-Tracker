import { combineReducers } from "redux";
import alertReducer from "./alert";
import authReducer from "./auth";

const reducers = combineReducers({
  auth: authReducer,
  alert: alertReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
