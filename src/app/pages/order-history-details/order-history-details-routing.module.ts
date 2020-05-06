import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderHistoryDetailsPage } from './order-history-details.page';

const routes: Routes = [
  {
    path: '',
    component: OrderHistoryDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderHistoryDetailsPageRoutingModule {}
