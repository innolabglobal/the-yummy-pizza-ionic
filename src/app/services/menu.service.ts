import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ApiResponseInterface } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(public http: HttpClient) { }

  getMenu(id: number) {
    return this.http
      .get(`${environment.apiBaseUrl}/api/menus/${id}`)
      .pipe(map((res: ApiResponseInterface) => res.data));
  }

  getAllMenu() {
    return this.http
      .get(`${environment.apiBaseUrl}/api/menus`)
      .pipe(map((res: ApiResponseInterface) => res.data));
  }
}
