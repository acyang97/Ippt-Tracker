import { authActionTypes } from "../action-types/auth.action-types";

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
    case authActionTypes.REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case authActionTypes.REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    case authActionTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload, // the output
      };
    case authActionTypes.AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    case authActionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case authActionTypes.LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    case authActionTypes.LOGOUT:
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
