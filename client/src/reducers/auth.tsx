import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

export interface AuthState {
  token: String | null;
  isAuthenticated: boolean | null;
  user: IUser | null;
}

export interface IUser {
  name: String;
  email: String;
  password: String;
  age: Number;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null, // to set true or false
  // loading: true,
  user: null, // want to make sure that loading is done and get a response
};

const authReducer = (
  state = initialState,
  action: { type: any; payload: any }
): AuthState => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload, // the output
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
