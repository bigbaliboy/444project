import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeHomePageRoutingModule } from './employee-home-routing.module';

import { EmployeeHomePage } from './employee-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeHomePageRoutingModule
  ],
  declarations: [EmployeeHomePage]
})
export class EmployeeHomePageModule {}
