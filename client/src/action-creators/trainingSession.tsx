import axios from "axios";
import { Dispatch } from "redux";
import { TrainingSessionActionTypes } from "../action-types/trainingSession.action-types";
import { ErrorAlert } from "../interfaces/Alert.interface";
import { convertTimeInStringToSecond } from "../utils/convertTimeInStringToSeconds";
import { setAlert } from "./alert";

export const initLoadTrainingSession = () => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get("/ippt-tracker/training-session", config);
    console.log("res.data", res.data);
    dispatch({
      type: TrainingSessionActionTypes.INIT_LOAD_TRAININGS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: ErrorAlert) =>
        dispatch(setAlert(error.message) as any)
      );
    }
  }
};

export const createTraining =
  (pushUps: Number, sitUps: Number, run: string) =>
  async (dispatch: Dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // do something to conver the run time in stirng to seconds before sending to the backend
    const runInSeconds = convertTimeInStringToSecond(run);
    const body = {
      pushUps,
      sitUps,
      run: runInSeconds,
    };

    try {
      const res = await axios.post(
        "/ippt-tracker/training-session/create",
        body,
        config
      );
      console.log(res);
      // dispatch({
      //   type: authActionTypes.REGISTER_SUCCESS,
      //   payload: res.data,
      // });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error: ErrorAlert) =>
          dispatch(setAlert(error.message) as any)
        );
      }
      // dispatch({
      //   type: authActionTypes.REGISTER_FAIL,
      // });
    }
  };
