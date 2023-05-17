import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { LoadUsersList, LoadUsersListSuccess, LoadUsersListFail } from './users.actions'

@Injectable()
export class UsersEffects {
  constructor(
    private actions$:Actions,
    private apiService$: ApiService,
  ) {}


  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(LoadUsersList),
    switchMap(({ page = 0, isLoadMore = false, limit = 100 }) => {

      return this.apiService$.getUsersList(page, limit, isLoadMore)
        .pipe(
          map((users) => {
            return LoadUsersListSuccess({ users })
          }),
          catchError((error) => {
            return of(LoadUsersListFail({ error }))
          })
        );
    })
  ));
}