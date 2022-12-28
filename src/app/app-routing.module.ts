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
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)},

  {
    path: 'o-employee-card',
    loadChildren: () => import('./o-employee-card/o-employee-card.module').then( m => m.OEmployeeCardPageModule)
  },
  {
    path: 'o-supplier-card',
    loadChildren: () => import('./o-supplier-card/o-supplier-card.module').then( m => m.OSupplierCardPageModule)
  },
  {
    path: 'o-stock-card',
    loadChildren: () => import('./o-stock-card/o-stock-card.module').then( m => m.OStockCardPageModule)},{

    
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'create-order',
    loadChildren: () => import('./create-order/create-order.module').then( m => m.CreateOrderPageModule)
  },
{
    path: 'employee-profile',
    loadChildren: () => import('./employee-profile/employee-profile.module').then( m => m.EmployeeProfilePageModule)
  },
  {
    path: 'employee-home',
    loadChildren: () => import('./employee-home/employee-home.module').then( m => m.EmployeeHomePageModule)
  },
  {
    path: 'supplier-profile',
    loadChildren: () => import('./supplier-profile/supplier-profile.module').then( m => m.SupplierProfilePageModule)
  },
  {
    path: 'supplier-home',
    loadChildren: () => import('./supplier-home/supplier-home.module').then( m => m.SupplierHomePageModule)
  },
  {
    path: 'employee-stock',
    loadChildren: () => import('./employee-stock/employee-stock.module').then( m => m.EmployeeStockPageModule)
  },
  


  
    


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
