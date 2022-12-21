import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';

import { ReportsPage } from './reports.page';
// import { NgxEchartsModule } from 'ngx-echarts';
import {Ng2SearchPipeModule} from 'ng2-search-filter';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule,
    Ng2SearchPipeModule
    // NgxEchartsModule.forRoot({
    //   echarts: () => import('echarts'),
    // }),
  ],
  declarations: [ReportsPage]
})


export class ReportsPageModule {

}
