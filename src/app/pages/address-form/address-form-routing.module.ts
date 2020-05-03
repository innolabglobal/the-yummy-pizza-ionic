import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressFormPage } from './address-form.page';

const routes: Routes = [
  {
    path: '',
    component: AddressFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressFormPageRoutingModule {}
