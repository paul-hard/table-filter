import { IUser } from "../interfaces/user.inteface";

export interface IAppState {
  users: IUser[];
  isLoading: boolean;
  isError: boolean;
}