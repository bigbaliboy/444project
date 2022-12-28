import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulerPageRoutingModule } from './scheduler-routing.module';

import { SchedulerPage } from './scheduler.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { CalModalPageModule } from './cal-modal/cal-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulerPageRoutingModule,
    NgCalendarModule,
    CalModalPageModule
  ],
  declarations: [SchedulerPage]
})
export class SchedulerPageModule {}
