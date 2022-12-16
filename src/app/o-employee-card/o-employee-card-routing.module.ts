import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OEmployeeCardPage } from './o-employee-card.page';

const routes: Routes = [
  {
    path: '',
    component: OEmployeeCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // declarations: [o-employee-]
})
export class OEmployeeCardPageRoutingModule {
  // name = new FormControl('');
}
