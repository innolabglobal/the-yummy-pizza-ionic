import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

const RATES = {
  EUR: 1.00,
  USD: 1.08,
};

@Pipe({
  name: 'currencyConverter'
})
export class CurrencyConverterPipe implements PipeTransform {

  rates = RATES;
  rateArray: Array<string>;
  index: number;
  selected: number;

  constructor(private currencyPipe: CurrencyPipe) {
    this.rateArray = [];
    this.index = 0;
    this.selected = 0;
  }

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }

    const currencyKey = args.toUpperCase();

    this.rateArray = Object.keys(this.rates);
    this.index = this.rateArray.indexOf(currencyKey);
    this.selected = this.rates[Object.keys(this.rates)[this.index]];

    const result = (this.selected * value).toFixed(2);

    return this.currencyPipe.transform(result, currencyKey, 'symbol');
  }

}
