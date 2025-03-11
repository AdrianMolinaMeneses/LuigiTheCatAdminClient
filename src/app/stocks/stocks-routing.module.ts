import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../dashboard/layouts/dashboard-layout/dashboard-layout.component';
import { StockManagerPageComponent } from './pages/stock-manager-page/stock-manager-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'stock-manager',
        component: StockManagerPageComponent,
      },
      {
        path: '**',
        redirectTo: 'stock-manager',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StocksRoutingModule {}
