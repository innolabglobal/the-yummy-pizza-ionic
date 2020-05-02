import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuDetailsPageRoutingModule } from './menu-details-routing.module';

import { MenuDetailsPage } from './menu-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuDetailsPageRoutingModule
  ],
  declarations: [MenuDetailsPage]
})
export class MenuDetailsPageModule {}
