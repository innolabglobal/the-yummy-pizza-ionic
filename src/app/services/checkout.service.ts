import { Injectable } from '@angular/core';
import { of } from 'rxjs';

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

  constructor() { }

  getPaymentTypes() {
    return of(DUMMY_PAYMENT_TYPES);
  }
}
