import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeProfilePage } from './employee-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeProfilePageRoutingModule {}
