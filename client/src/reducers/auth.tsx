import { authActionTypes } from "../action-types/auth.action-types";
import { AuthState } from "../interfaces/Auth.interface";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null, // to set true or false
  isLoading: true,
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
        isLoading: false,
      };
    case authActionTypes.REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        isLoading: false,
      };
    case authActionTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload, // the output
        isLoading: false,
      };
    case authActionTypes.AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case authActionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case authActionTypes.LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        isLoading: false,
      };
    case authActionTypes.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
