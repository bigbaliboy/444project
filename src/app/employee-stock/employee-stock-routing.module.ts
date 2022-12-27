import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeStockPage } from './employee-stock.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeStockPageRoutingModule {}
