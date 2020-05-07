import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ApiResponseInterface } from '../interfaces/api-response.interface';
import { Observable } from 'rxjs';
import { OrderInterface } from '../interfaces/order.interface';
import { OrderPipe } from 'ngx-order-pipe';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
              private orderPipe: OrderPipe,) { }

  getOrder(id): Observable<OrderInterface> {
    return this.http
      .get(`${environment.apiBaseUrl}/api/own/orders/${id}`)
      .pipe(map((res: ApiResponseInterface) => res.data));
  }

  getOrders(): Observable<OrderInterface[]> {
    return this.http
      .get(`${environment.apiBaseUrl}/api/own/orders`)
      .pipe(map((res: ApiResponseInterface) => this.orderPipe.transform(res.data, 'created_at', true)));
  }
}
