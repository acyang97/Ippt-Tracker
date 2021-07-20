import { IUser } from "./User.interface";

export interface AuthState {
  token: String | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  user: IUser | null;
}
