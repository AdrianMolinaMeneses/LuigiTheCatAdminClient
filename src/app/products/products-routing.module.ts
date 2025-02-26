import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../dashboard/layouts/dashboard-layout/dashboard-layout.component';
import { ProductEditorPageComponent } from './pages/product-editor-page/product-editor-page.component';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'add-product',
        component: ProductEditorPageComponent,
      },
      {
        path: 'edit-product/:id',
        component: ProductEditorPageComponent,
      },
      {
        path: 'products-list',
        component: ProductsListPageComponent,
      },
      {
        path: '**',
        redirectTo: 'products-list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
