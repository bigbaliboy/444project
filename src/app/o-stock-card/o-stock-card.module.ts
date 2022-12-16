import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OStockCardPageRoutingModule } from './o-stock-card-routing.module';

import { OStockCardPage } from './o-stock-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OStockCardPageRoutingModule
  ],
  declarations: [OStockCardPage]
})
export class OStockCardPageModule {}
