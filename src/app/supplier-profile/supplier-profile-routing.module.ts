import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierProfilePage } from './supplier-profile.page';

const routes: Routes = [
  {
    path: '',
    component: SupplierProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierProfilePageRoutingModule {}
