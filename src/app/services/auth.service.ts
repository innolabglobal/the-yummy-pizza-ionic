import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { ApiResponseInterface } from '../interfaces/api-response.interface';

const TOKEN_STORAGE_KEY = 'ACCESS_TOKEN';
const PROFILE_STORAGE_KEY = 'USER_PROFILE';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  init() {
    return this.http
      .get(`${environment.apiBaseUrl}/sanctum/csrf-cookie`, { observe: 'response' });
  }

  getOrderHistory() {
    return this.http.get(`${environment.apiBaseUrl}/api/orders`);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  login(credential) {
    return this.http
      .post(`${environment.apiBaseUrl}/api/login`, credential)
      .pipe(
        tap(((res: ApiResponseInterface) => {
          localStorage.setItem(TOKEN_STORAGE_KEY, res.data.token);
          localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
          }));
        }))
      );
  }

  logout() {
    return this.http
      .post(`${environment.apiBaseUrl}/api/logout`, {})
      .pipe(
        tap(((res: ApiResponseInterface) => {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          localStorage.removeItem(PROFILE_STORAGE_KEY);
        }))
      );
  }

  profile() {
    return localStorage.getItem(PROFILE_STORAGE_KEY);
  }

  register(credential) {
    return this.http
      .post(`${environment.apiBaseUrl}/api/register`, credential)
      .pipe(
        tap(((res: ApiResponseInterface) => {
          localStorage.setItem(TOKEN_STORAGE_KEY, res.data.token);
          localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
          }));
        }))
      );
  }

  token() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }
}
