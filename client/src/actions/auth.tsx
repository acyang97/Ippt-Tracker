import axios from "axios";
import { Dispatch } from "redux";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const test =
  (name: String, email: String, password: String, age: Number) =>
  async (dispatch: Dispatch) => {
    console.log("testing");
  };
// REGISTER USER
export const register =
  (
    name: String,
    email: String,
    password: String,
    confirmPassword: String,
    age: Number
  ) =>
  async (dispatch: Dispatch) => {
    console.log("registering");
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
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      //   dispatch(loadUser());
    } catch (err) {
      console.log(err.message);
      //   const errors = err.response.data.errors;
      //   if (errors) {
      //     errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      //   }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// LOGIN USER
export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      // WE WANT TO LOGIN
      console.log(body);
      const res = await axios.post("/api/auth", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      // dispatch(loadUser());
    } catch (err) {
      console.log(err.message);
      // const errors = err.response.data.errors;
      // if (errors) {
      //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      // }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const loadUser = () => async (dispatch: Dispatch) => {
  // check local storage
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    console.log(res.data);
    // dispatch({
    //   type: USER_LOADED,
    //   payload: res.data,
    // });
  } catch (err) {
    // dispatch({
    //   type: AUTH_ERROR,
    // });
  }
};

export const logout = () => (dispatch: Dispatch) => {
  dispatch({ type: LOGOUT });
};
