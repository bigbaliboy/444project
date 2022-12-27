import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OStockCardPageRoutingModule } from './o-stock-card-routing.module';

import {Ng2SearchPipeModule} from 'ng2-search-filter';

import { OStockCardPage } from './o-stock-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OStockCardPageRoutingModule,
    Ng2SearchPipeModule

  ],
  declarations: [OStockCardPage]
})
export class OStockCardPageModule {}
