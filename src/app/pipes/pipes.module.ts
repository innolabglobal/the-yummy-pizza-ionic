import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterPipe } from './currency-converter.pipe';

const PIPES = [
  CurrencyConverterPipe
];

@NgModule({
  declarations: PIPES,
  imports: [
    CommonModule
  ],
  exports: PIPES,
})
export class PipesModule {}
