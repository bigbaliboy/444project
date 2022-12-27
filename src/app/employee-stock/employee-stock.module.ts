import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


import { EmployeeStockPageRoutingModule } from './employee-stock-routing.module';

import { EmployeeStockPage } from './employee-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EmployeeStockPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [EmployeeStockPage]
})
export class EmployeeStockPageModule {}
