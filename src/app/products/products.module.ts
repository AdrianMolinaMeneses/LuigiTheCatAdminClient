import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductEditorPageComponent } from './pages/product-editor-page/product-editor-page.component';
import { ViewProductsPageComponent } from './pages/view-products-page/view-products-page.component';
import { NebularThemeModule } from '../nebular-theme/nebular-theme.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductEditorPageComponent, ViewProductsPageComponent],
  imports: [
    AgGridModule,
    CommonModule,
    ProductsRoutingModule,
    NebularThemeModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ProductsModule {}
