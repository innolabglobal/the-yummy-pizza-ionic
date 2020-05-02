import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuDetailsPage } from './menu-details.page';

const routes: Routes = [
  {
    path: '',
    component: MenuDetailsPage
  },
  {
    path: ':id',
    component: MenuDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuDetailsPageRoutingModule {}
