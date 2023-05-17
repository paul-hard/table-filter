import { createReducer, on } from "@ngrx/store";
import { IAppState } from "../app.state";
import { LoadUsersList, LoadUsersListFail, LoadUsersListSuccess } from "./users.actions";


export const usersFeatureKey = 'users';

export const initialState: IAppState = {
  users: [],
  isLoading: false,
  isError: false,
};


export const usersReducer = createReducer(
  initialState,
  on(LoadUsersList, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(LoadUsersListSuccess, (state, { users } ) => ({
    ...state,
    users: users,
    isLoading:false,
    isError: false
  })),
  on(LoadUsersListFail, (state) => ({
    ...state,
    isLoading:false,
    isError: true
  })),
)

