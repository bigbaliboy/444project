import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OSupplierCardPage } from './o-supplier-card.page';

const routes: Routes = [
  {
    path: '',
    component: OSupplierCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OSupplierCardPageRoutingModule {}
