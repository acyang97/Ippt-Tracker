import axios from "axios";
import { Dispatch } from "redux";
import { ErrorAlert } from "../interfaces/Alert.interface";
import { convertTimeInStringToSecond } from "../utils/convertTimeInStringToSeconds";
import { setAlert } from "./alert";

// REGISTER USER
// the only reason for dispatching is that
// I need to add it to the list of trainings
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
    console.log(runInSeconds);
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
