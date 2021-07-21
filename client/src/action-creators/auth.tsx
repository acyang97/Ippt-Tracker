import axios from "axios";
import { Dispatch } from "redux";
import { authActionTypes } from "../action-types/auth.action-types";
import {
  AuthErrorAction,
  LoadUserAction,
  LoginFailAction,
  LoginSuccessAction,
  LogoutAction,
  RegisterFailAction,
  RegisterSucessAction,
} from "../actions/auth.actions";
import { ErrorAlert } from "../interfaces/Alert.interface";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";

// REGISTER USER
export const register =
  (
    name: String,
    email: String,
    password: String,
    confirmPassword: String,
    age: Number
  ) =>
  async (dispatch: Dispatch<RegisterSucessAction | RegisterFailAction>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      name,
      email,
      age: Number(age),
      password,
      confirmPassword,
    };
    try {
      const res = await axios.post("/ippt-tracker/users", body, config);
      dispatch({
        type: authActionTypes.REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser() as any);
    } catch (err) {
      console.log("errorrrr");
      console.log(err);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error: ErrorAlert) =>
          dispatch(setAlert(error.message, "error") as any)
        );
      }
      dispatch({
        type: authActionTypes.REGISTER_FAIL,
      });
    }
  };

// LOGIN USER
export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<LoginSuccessAction | LoginFailAction>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      // WE WANT TO LOGIN
      const res = await axios.post("/ippt-tracker/auth", body, config);
      dispatch({
        type: authActionTypes.LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser() as any);
      dispatch(setAlert("Success", "success") as any);
    } catch (err) {
      const errors = err.response.data.errors;
      console.log("errors", errors);
      if (errors) {
        errors.forEach((error: ErrorAlert) =>
          dispatch(setAlert(error.message, "error") as any)
        );
      }
      dispatch({
        type: authActionTypes.LOGIN_FAIL,
      });
    }
  };

export const loadUser =
  () => async (dispatch: Dispatch<LoadUserAction | AuthErrorAction>) => {
    // check local storage, set the new token
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/ippt-tracker/auth");
      console.log(res.data);
      // payload is the user information
      dispatch({
        type: authActionTypes.USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: authActionTypes.AUTH_ERROR,
      });
    }
  };

export const logout = () => (dispatch: Dispatch<LogoutAction>) => {
  dispatch({ type: authActionTypes.LOGOUT });
};
