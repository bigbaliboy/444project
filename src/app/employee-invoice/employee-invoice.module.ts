import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

import { IonicModule } from '@ionic/angular';

import { EmployeeInvoicePageRoutingModule } from './employee-invoice-routing.module';

import { EmployeeInvoicePage } from './employee-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeInvoicePageRoutingModule,
    Ng2SearchPipeModule

  ],
  declarations: [EmployeeInvoicePage]
})
export class EmployeeInvoicePageModule {}
