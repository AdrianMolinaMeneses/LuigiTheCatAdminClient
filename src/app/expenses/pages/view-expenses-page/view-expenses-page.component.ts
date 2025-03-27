import { Component, OnInit } from '@angular/core';
import { Expense } from '../../interfaces/expense.interface';
import { ExpenseService } from '../../services/expense.service';
import { ColDef } from 'ag-grid-community';
import { localeEs } from '../../../../locale-es';
import { IconRendererComponent } from '../../../shared/components/icon-renderer/icon-renderer.component';
import { ToastNotificationService } from '../../../shared/services/toast-notification.service';
import { NbDialogService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { DatePipe } from '@angular/common';
import { RegisterExpenseDialogComponent } from '../../components/register-expense-dialog/register-expense-dialog.component';

@Component({
  selector: 'app-view-expenses-page',
  templateUrl: './view-expenses-page.component.html',
  styleUrl: './view-expenses-page.component.css',
})
export class ViewExpensesPageComponent implements OnInit {
  public expenses: Expense[] = [];

  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {};
  public localeText = localeEs;

  public loading: boolean = false;

  constructor(
    private expenseService: ExpenseService,
    private toastNotificationService: ToastNotificationService,
    private dialogService: NbDialogService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getExpenses();
    this.loadTable();
  }

  getExpenses() {
    this.loading = true;

    this.expenseService.listExpenses().subscribe({
      next: (expenses) => {
        this.expenses = expenses;
        this.loading = false;
      },
      error: (message) => {
        console.log(message);
        this.loading = false;
      },
    });
  }

  loadTable() {
    this.columnDefs = [
      {
        headerName: 'Fecha de registro',
        valueGetter: (params) => {
          return this.datePipe.transform(
            params.data.registerDate,
            'dd/MM/yyyy'
          )!;
        },
        cellStyle: { 'text-align': 'center' },
        minWidth: 145,
        maxWidth: 145,
      },
      { headerName: 'Descripción', field: 'description' },
      {
        headerName: 'Monto (Bs.)',
        field: 'amount',
        cellStyle: { 'text-align': 'center' },
        minWidth: 110,
        maxWidth: 110,
      },
      {
        cellRenderer: IconRendererComponent,
        cellRendererParams: {
          icon: 'trash-2-outline',
          tooltip: 'Eliminar',
          color: 'danger',
          onAction: this.deleteExpense.bind(this),
        },
        cellStyle: { 'text-align': 'center' },
        minWidth: 60,
        maxWidth: 60,
      },
    ];

    this.defaultColDef = { resizable: true, flex: 1 };
  }

  openRegisterExpenseDialog() {
    this.dialogService
      .open(RegisterExpenseDialogComponent, {
        closeOnBackdropClick: false,
        dialogClass: 'custom-form-dialog',
      })
      .onClose.subscribe((res) => {
        if (res) {
          this.getExpenses();
        }
      });
  }

  deleteExpense(expenseId: string) {
    let expense = this.expenses.find((e) => e._id === expenseId);

    const data = {
      textHeader: 'Eliminar Gasto',
      message: `¿Esta seguro de eliminar el gasto?`,
    };

    this.dialogService
      .open(ConfirmationDialogComponent, {
        context: { data },
        closeOnBackdropClick: false,
        dialogClass: 'custom-confirmation-dialog',
      })
      .onClose.subscribe((res) => {
        if (res) {
          this.loading = true;
          this.expenseService.deleteExpense(expenseId).subscribe({
            next: () => {
              this.toastNotificationService.showToast(
                'Éxito',
                `Se elimino el gasto`,
                'success'
              );
              this.expenses = this.expenses.filter(
                (expense) => expense._id !== expenseId
              );
              this.loading = false;
            },
            error: (err) => {
              this.toastNotificationService.showToast(
                'Error',
                err.error.message,
                'danger'
              );
              this.loading = false;
            },
          });
        }
      });
  }
}
