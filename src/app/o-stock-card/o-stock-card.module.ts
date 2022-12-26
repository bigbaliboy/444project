import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OStockCardPageRoutingModule } from './o-stock-card-routing.module';

import { OStockCardPage } from './o-stock-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OStockCardPageRoutingModule
  ],
  declarations: [OStockCardPage]
})
export class OStockCardPageModule {}
