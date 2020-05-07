import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const SELECTED_CURRENCY_STORAGE_KEY = 'SELECTED_CURRENCY';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  selectedCurrency;
  selectedCurrency$: BehaviorSubject<string> = new BehaviorSubject<string>('EUR');

  constructor() {
    this.selectedCurrency = localStorage.getItem(SELECTED_CURRENCY_STORAGE_KEY) || 'EUR';
    this.setCurrency(this.selectedCurrency);
  }

  setCurrency(currency) {
    this.selectedCurrency$.next(currency);
    this.selectedCurrency = currency;
    localStorage.setItem(SELECTED_CURRENCY_STORAGE_KEY, currency);
  }
}
