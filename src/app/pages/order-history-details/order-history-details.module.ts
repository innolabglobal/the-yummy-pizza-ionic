import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderHistoryDetailsPageRoutingModule } from './order-history-details-routing.module';

import { OrderHistoryDetailsPage } from './order-history-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderHistoryDetailsPageRoutingModule
  ],
  declarations: [OrderHistoryDetailsPage]
})
export class OrderHistoryDetailsPageModule {}
