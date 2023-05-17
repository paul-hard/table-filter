import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models

import { IUser } from '../interfaces/user.inteface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public httpClient = inject(HttpClient);

  public getUsersList(page: number, limit: number, isLoadMore: boolean): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(environment.apiUrl + '/users', {
      params: {
        per_page: limit
      }
    });
  }
}
