import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const DUMMY_PAYMENT_TYPES = [
  {
    default: true,
    type: 'Braintree',
    value: 'Braintree',
    logo: 'assets/images/braintree-logo.png'
  },
  {
    default: false,
    type: 'Stripe',
    value: 'Stripe',
    logo: 'assets/images/stripe-logo.png'
  },
  {
    default: false,
    type: 'COD',
    value: 'COD',
    logo: ''
  }
];

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(public http: HttpClient) { }

  getPaymentTypes() {
    return of(DUMMY_PAYMENT_TYPES);
  }

  checkout(body) {
    return this.http.post(`${environment.apiBaseUrl}/api/own/orders`, body);
  }
}
