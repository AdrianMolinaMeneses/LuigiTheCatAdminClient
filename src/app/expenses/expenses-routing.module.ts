import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../dashboard/layouts/dashboard-layout/dashboard-layout.component';
import { ViewExpensesPageComponent } from './pages/view-expenses-page/view-expenses-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'view-expenses',
        component: ViewExpensesPageComponent,
      },
      {
        path: '**',
        redirectTo: 'view-expenses',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesRoutingModule {}
