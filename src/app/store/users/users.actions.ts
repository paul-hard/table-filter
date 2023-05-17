import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/interfaces/user.inteface";

export enum EUsersActions {
  LOAD_USERS_LIST = '[USERS] Load users list',
  LOAD_USERS_LIST_SUCCESS = '[USERS] Load users list success',
  LOAD_USERS_LIST_FAIL = '[USERS] Load users list failed',
}

export const LoadUsersList = createAction<
  EUsersActions.LOAD_USERS_LIST,
  { page: number, limit?: number, isLoadMore?: boolean }
>(EUsersActions.LOAD_USERS_LIST, props<{ page: number, limit?: number, isLoadMore?: boolean }>());


export const LoadUsersListSuccess = createAction<
  EUsersActions.LOAD_USERS_LIST_SUCCESS,
  { users: IUser[] }
>(EUsersActions.LOAD_USERS_LIST_SUCCESS, props<{ users: IUser[] }>());


export const LoadUsersListFail = createAction<
  EUsersActions.LOAD_USERS_LIST_FAIL,
  { error: any }
>(EUsersActions.LOAD_USERS_LIST_FAIL, props<{ error: any }>());