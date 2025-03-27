import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ViewExpensesPageComponent } from './pages/view-expenses-page/view-expenses-page.component';
import { AgGridModule } from 'ag-grid-angular';
import { NebularThemeModule } from '../nebular-theme/nebular-theme.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegisterExpenseDialogComponent } from './components/register-expense-dialog/register-expense-dialog.component';

@NgModule({
  declarations: [ViewExpensesPageComponent, RegisterExpenseDialogComponent],
  imports: [
    AgGridModule,
    CommonModule,
    ExpensesRoutingModule,
    NebularThemeModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ExpensesModule {}
