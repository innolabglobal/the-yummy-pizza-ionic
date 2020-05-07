import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-currency-btn',
  templateUrl: './currency-btn.component.html',
  styleUrls: ['./currency-btn.component.scss'],
})
export class CurrencyBtnComponent implements OnInit {

  selectedCurrency: string;
  selectedCurrency$: Observable<string>;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.selectedCurrency = this.currencyService.selectedCurrency;
    this.selectedCurrency$ = this.currencyService.selectedCurrency$;
  }

  onCurrencyBtnClicked() {
    if (this.selectedCurrency === 'EUR') {
      this.currencyService.setCurrency('USD');
      this.selectedCurrency = this.currencyService.selectedCurrency;
    } else if (this.selectedCurrency === 'USD') {
      this.currencyService.setCurrency('EUR');
      this.selectedCurrency = this.currencyService.selectedCurrency;
    }
  }
}
