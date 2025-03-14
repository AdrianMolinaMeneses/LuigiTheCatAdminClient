import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { NebularThemeModule } from '../nebular-theme/nebular-theme.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StocksRoutingModule } from './stocks-routing.module';
import { StockManagerPageComponent } from './pages/stock-manager-page/stock-manager-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StockManagerDialogComponent } from './components/stock-manager-dialog/stock-manager-dialog.component';
import { ViewStockMovementsPageComponent } from './pages/view-stock-movements-page/view-stock-movements-page.component';

@NgModule({
  declarations: [StockManagerPageComponent, StockManagerDialogComponent, ViewStockMovementsPageComponent],
  imports: [
    AgGridModule,
    CommonModule,
    NebularThemeModule,
    SharedModule,
    ReactiveFormsModule,
    StocksRoutingModule,
  ],
})
export class StocksModule {}
