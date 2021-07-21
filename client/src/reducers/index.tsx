import { combineReducers } from "redux";
import alertReducer from "./alert";
import authReducer from "./auth";
import trainingSessionReducer from "./trainingSession";

const reducers = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  trainingSession: trainingSessionReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
