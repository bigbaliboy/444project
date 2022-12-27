import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OEmployeeCardPageRoutingModule } from './o-employee-card-routing.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

import { OEmployeeCardPage } from './o-employee-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OEmployeeCardPageRoutingModule,
    Ng2SearchPipeModule

  ],
  declarations: [OEmployeeCardPage]
})
export class OEmployeeCardPageModule {}
