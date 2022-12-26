import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateOrderPageRoutingModule } from './create-order-routing.module';

import { CreateOrderPage } from './create-order.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateOrderPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [CreateOrderPage]
})
export class CreateOrderPageModule {}
