import { IAppState } from '../app.state';
import { usersFeatureKey } from './users.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUsers = createFeatureSelector<IAppState>(usersFeatureKey)

export const selectUsersList = createSelector(
  selectUsers,
  ({ users }) => users
);