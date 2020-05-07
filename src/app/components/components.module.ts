import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyBtnComponent } from './currency-btn/currency-btn.component';
import { IonicModule } from '@ionic/angular';

const COMPONENTS = [
  CurrencyBtnComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: COMPONENTS
})
export class ComponentsModule {}
