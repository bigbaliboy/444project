import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



import { IonicModule } from '@ionic/angular';

import { OSupplierCardPageRoutingModule } from './o-supplier-card-routing.module';

import { OSupplierCardPage } from './o-supplier-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OSupplierCardPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [OSupplierCardPage]
})
export class OSupplierCardPageModule {}
