import { authActionTypes } from "../action-types/auth.action-types";

export interface RegisterSucessAction {
  type: authActionTypes.REGISTER_SUCCESS;
  payload: string; // the token
}

export interface RegisterFailAction {
  type: authActionTypes.REGISTER_FAIL;
}

export interface UserLoadedAction {
  type: authActionTypes.USER_LOADED;
}

export interface LoginSuccessAction {
  type: authActionTypes.LOGIN_SUCCESS;
  payload: { token: string };
}

export interface LoginFailAction {
  type: authActionTypes.LOGIN_FAIL;
}

export interface LogoutAction {
  type: authActionTypes.LOGOUT;
}

export interface LoadUserAction {
  type: authActionTypes.USER_LOADED;
}

export interface AuthErrorAction {
  type: authActionTypes.AUTH_ERROR;
}

export type AuthAction =
  | RegisterSucessAction
  | RegisterFailAction
  | UserLoadedAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction
  | LoadUserAction
  | AuthErrorAction;
