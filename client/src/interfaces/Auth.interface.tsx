import { IUser } from "./User.interface";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  user: IUser | null;
}
