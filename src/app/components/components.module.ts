import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyBtnComponent } from './currency-btn/currency-btn.component';
import { IonicModule } from '@ionic/angular';
import { CartBtnComponent } from './cart-btn/cart-btn.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  CartBtnComponent,
  CurrencyBtnComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  exports: COMPONENTS
})
export class ComponentsModule {}
