import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ApiResponseInterface } from '../interfaces/api-response.interface';
import { Observable } from 'rxjs';
import { OrderInterface } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrder(id): Observable<OrderInterface> {
    return this.http
      .get(`${environment.apiBaseUrl}/api/own/orders/${id}`)
      .pipe(map((res: ApiResponseInterface) => res.data));
  }

  getOrders(): Observable<OrderInterface[]> {
    return this.http
      .get(`${environment.apiBaseUrl}/api/own/orders`)
      .pipe(map((res: ApiResponseInterface) => res.data));
  }
}
