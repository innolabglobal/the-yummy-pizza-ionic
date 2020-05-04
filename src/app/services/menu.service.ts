import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(public http: HttpClient) { }

  getMenu(id: number) {
    return this.http.get(`${environment.apiBaseUrl}/menus/${id}`).pipe(map(res => res.data));
  }

  getAllMenu() {
    return this.http.get(`${environment.apiBaseUrl}/menus`).pipe(map(res => res.data));
  }
}
