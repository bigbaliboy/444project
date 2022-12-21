import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
    path: 'employees-card',
    loadChildren: () => import('./employees-card/employees-card.module').then( m => m.EmployeesCardPageModule)
  },
  {
    path: 'o-employee-card',
    loadChildren: () => import('./o-employee-card/o-employee-card.module').then( m => m.OEmployeeCardPageModule)
  },
  {
    path: 'o-stock-card',
    loadChildren: () => import('./o-stock-card/o-stock-card.module').then( m => m.OStockCardPageModule)
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
