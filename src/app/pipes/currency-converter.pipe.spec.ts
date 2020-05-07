import { CurrencyConverterPipe } from './currency-converter.pipe';

describe('CurrencyConverterPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyConverterPipe();
    expect(pipe).toBeTruthy();
  });
});
