import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductEditorPageComponent } from './pages/product-editor-page/product-editor-page.component';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';


@NgModule({
  declarations: [
    ProductEditorPageComponent,
    ProductsListPageComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
