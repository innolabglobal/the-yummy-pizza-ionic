import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderHistoryDetailsPageRoutingModule } from './order-history-details-routing.module';

import { OrderHistoryDetailsPage } from './order-history-details.page';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderHistoryDetailsPageRoutingModule,
    PipesModule,
    ComponentsModule
  ],
  declarations: [OrderHistoryDetailsPage]
})
export class OrderHistoryDetailsPageModule {}
