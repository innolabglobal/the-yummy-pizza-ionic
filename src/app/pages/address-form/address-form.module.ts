import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressFormPageRoutingModule } from './address-form-routing.module';

import { AddressFormPage } from './address-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressFormPageRoutingModule
  ],
  declarations: [AddressFormPage]
})
export class AddressFormPageModule {}
