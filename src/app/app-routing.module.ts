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
  }
  // {
  //   path: 'employee-view',
  //   loadChildren: () => import('./employee-view/employee-view.module').then( m => m.EmployeeViewPageModule)
  // },
  // {
  //   path: 'employee-view1',
  //   loadChildren: () => import('./employee-view1/employee-view1.module').then( m => m.EmployeeView1PageModule)
  // },
  // {
  //   path: 'employee-view2',
  //   loadChildren: () => import('./employee-view2/employee-view2.module').then( m => m.EmployeeView2PageModule)
  // }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
