import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeHomePage } from './employee-home.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeHomePageRoutingModule {}
