import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuDetailsPageRoutingModule } from './menu-details-routing.module';

import { MenuDetailsPage } from './menu-details.page';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuDetailsPageRoutingModule,
    PipesModule,
    ComponentsModule
  ],
  declarations: [MenuDetailsPage]
})
export class MenuDetailsPageModule {}
