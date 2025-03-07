import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../dashboard/layouts/dashboard-layout/dashboard-layout.component';
import { ProductEditorPageComponent } from './pages/product-editor-page/product-editor-page.component';
import { ViewProductsPageComponent } from './pages/view-products-page/view-products-page.component';

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
        path: 'view-products',
        component: ViewProductsPageComponent,
      },
      {
        path: '**',
        redirectTo: 'view-products',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
