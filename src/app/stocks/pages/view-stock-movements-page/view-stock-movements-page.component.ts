import { Component, OnInit } from '@angular/core';
import { StockMovementService } from '../../services/stock-movement.service';
import { StockMovement } from '../../interfaces/stock-movement.interface';
import { ColDef } from 'ag-grid-community';
import { localeEs } from '../../../../locale-es';
import { DatePipe } from '@angular/common';
import { IconRendererComponent } from '../../../shared/components/icon-renderer/icon-renderer.component';
import { TypeStockMovementEnum } from '../../interfaces/type-stock-movement-enum.interface';
import { FormControl } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { CancelStockMovement } from '../../interfaces/cancel-stock-movement.interface';
import { ToastNotificationService } from '../../../shared/services/toast-notification.service';

@Component({
  selector: 'app-view-stock-movements-page',
  templateUrl: './view-stock-movements-page.component.html',
  styleUrl: './view-stock-movements-page.component.css',
})
export class ViewStockMovementsPageComponent implements OnInit {
  public stockMovements: StockMovement[] = [];
  public typeStockMovements = Object.values(TypeStockMovementEnum);
  public typeStockMovementControl = new FormControl('');

  private currentDate: Date = new Date();
  public startDate: Date = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth(),
    1
  );
  public endDate: Date = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth() + 1,
    0
  );

  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {};
  public localeText = localeEs;

  public loading: boolean = false;

  constructor(
    private stockMovementService: StockMovementService,
    private datePipe: DatePipe,
    private dialogService: NbDialogService,
    private toastNotificationService: ToastNotificationService
  ) {}

  ngOnInit(): void {
    this.getStockMovements(this.startDate, this.endDate, '');
    this.loadTable();

    this.typeStockMovementControl.valueChanges.subscribe((value) => {
      this.getStockMovements(this.startDate, this.endDate, value!);
    });
  }

  getStockMovements(startDate: Date, endDate: Date, typeStockMovement: string) {
    this.loading = true;
    this.startDate = startDate;
    this.endDate = endDate;

    this.stockMovementService
      .listStockMovements(startDate, endDate, typeStockMovement)
      .subscribe({
        next: (stockMovements) => {
          this.stockMovements = stockMovements;
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
      {
        headerName: 'Tipo',
        field: 'type',
        minWidth: 80,
        maxWidth: 80,
      },
      {
        headerName: 'Estado',
        field: 'status',
        cellRenderer: IconRendererComponent,
        cellRendererParams: (params: any) => {
          if (params.data.status) {
            return {
              icon: 'checkmark-circle-2-outline',
              color: 'success',
            };
          } else {
            return {
              icon: 'close-circle-outline',
              color: 'danger',
            };
          }
        },
        cellStyle: { 'text-align': 'center' },
        minWidth: 80,
        maxWidth: 80,
      },
      {
        headerName: 'Producto',
        valueGetter: (params) => {
          return `${params.data.stock.product.name} color ${params.data.stock.product.color} talla ${params.data.stock.product.size}`;
        },
      },
      {
        headerName: 'Descripción',
        field: 'description',
        minWidth: 175,
        maxWidth: 175,
      },
      {
        headerName: 'Cantidad',
        field: 'quantity',
        cellStyle: { 'text-align': 'center' },
        minWidth: 90,
        maxWidth: 90,
      },
      {
        headerName: 'Precio (Bs.)',
        field: 'unitPrice',
        cellStyle: { 'text-align': 'center' },
        minWidth: 105,
        maxWidth: 105,
      },
      {
        headerName: 'Total (Bs.)',
        field: 'totalAmount',
        cellStyle: { 'text-align': 'center' },
        minWidth: 105,
        maxWidth: 105,
      },
      {
        cellRenderer: IconRendererComponent,
        cellRendererParams: {
          icon: 'close-square-outline',
          tooltip: 'Anular movimiento',
          color: 'danger',
          onAction: this.cancelMovement.bind(this),
        },
        cellStyle: (params) => ({
          'text-align': 'center',
          visibility: params.data.status ? '' : 'hidden',
        }),
        minWidth: 60,
        maxWidth: 60,
      },
    ];

    this.defaultColDef = { resizable: true, flex: 1 };
  }

  cancelMovement(stockMovementId: string) {
    let stockMovement = this.stockMovements.find(
      (sm) => sm._id === stockMovementId
    );

    const data = {
      textHeader: 'Anular Movimiento',
      message: `¿Esta seguro de anular el movimiento de ${stockMovement?.type} para ${stockMovement?.stock.product.name} color ${stockMovement?.stock.product.color} talla ${stockMovement?.stock.product.size}?`,
    };

    this.dialogService
      .open(ConfirmationDialogComponent, {
        context: { data },
        closeOnBackdropClick: false,
        dialogClass: 'custom-confirmation-dialog',
      })
      .onClose.subscribe((res) => {
        if (res && stockMovement) {
          const stockMovementToCancel: CancelStockMovement = {
            _id: stockMovement._id!,
          };

          this.loading = true;
          this.stockMovementService
            .cancelStockMovement(stockMovement._id!, stockMovementToCancel)
            .subscribe({
              next: () => {
                this.toastNotificationService.showToast(
                  'Éxito',
                  `Se cancelo el movimiento`,
                  'success'
                );
                stockMovement.status = false;
                stockMovement.description = 'Movimiento anulado';
                this.stockMovements = [...this.stockMovements];
                this.loading = false;
              },
              error: (err) => {
                console.log(err);
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
