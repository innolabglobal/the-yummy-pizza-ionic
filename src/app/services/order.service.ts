import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrder(id) {
    return this.http
      .get(`${environment.apiBaseUrl}/api/own/orders/${id}`)
      .pipe(map(res => res.data));
  }

  getOrders() {
    return this.http
      .get(`${environment.apiBaseUrl}/api/own/orders`)
      .pipe(map(res => res.data));
  }
}
