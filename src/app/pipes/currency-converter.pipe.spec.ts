import { CurrencyConverterPipe } from './currency-converter.pipe';
import { inject } from '@angular/core/testing';
import { CurrencyPipe } from '@angular/common';

describe('CurrencyConverterPipe', () => {
  it('create an instance', inject([CurrencyPipe], (currencyPipe: CurrencyPipe) => {
    const pipe = new CurrencyConverterPipe(currencyPipe);
    expect(pipe).toBeTruthy();
  }));
});
