import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierProfilePageRoutingModule } from './supplier-profile-routing.module';

import { SupplierProfilePage } from './supplier-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupplierProfilePageRoutingModule
  ],
  declarations: [SupplierProfilePage]
})
export class SupplierProfilePageModule {}
