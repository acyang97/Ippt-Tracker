import { combineReducers } from "redux";
import alertReducer from "./alert";
import authReducer from "./auth";
import trainingSessionReducer from "./trainingSession";
import UserReducer from "./user";

const reducers = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  trainingSession: trainingSessionReducer,
  user: UserReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
