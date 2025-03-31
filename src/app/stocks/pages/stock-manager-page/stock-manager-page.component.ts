import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../interfaces/stock.interface';
import { FormControl } from '@angular/forms';
import { ColorEnum } from '../../../products/interfaces/color-enum.interface';
import { SizeEnum } from '../../../products/interfaces/size-enum.interface';
import { ColDef } from 'ag-grid-community';
import { localeEs } from '../../../../locale-es';
import { IconRendererComponent } from '../../../shared/components/icon-renderer/icon-renderer.component';
import { NbDialogService } from '@nebular/theme';
import { StockManagerDialogComponent } from '../../components/stock-manager-dialog/stock-manager-dialog.component';
import { TypeStockMovementEnum } from '../../interfaces/type-stock-movement-enum.interface';

@Component({
  selector: 'app-stock-manager-page',
  templateUrl: './stock-manager-page.component.html',
  styleUrl: './stock-manager-page.component.css',
})
export class StockManagerPageComponent implements OnInit {
  public stocks: Stock[] = [];
  public colorControl = new FormControl('');
  public sizeControl = new FormControl('');
  public colors = Object.values(ColorEnum);
  public sizes = Object.values(SizeEnum);
  private query: string = '';
  public totalStock: number = 0;

  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {};
  public localeText = localeEs;

  public loading: boolean = false;

  constructor(
    private stockService: StockService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.getStocks('', '', '');
    this.loadTable();

    this.colorControl.valueChanges.subscribe((value) => {
      this.getStocks(this.query, this.sizeControl.value!, value!);
    });

    this.sizeControl.valueChanges.subscribe((value) => {
      this.getStocks(this.query, value!, this.colorControl.value!);
    });
  }

  getStocks(query: string, size: string, color: string) {
    this.loading = true;
    this.query = query;

    this.stockService.listStocks(query, size, color).subscribe({
      next: (stocks) => {
        this.stocks = stocks;
        this.totalStock = this.stocks.reduce(
          (sum, stock) => sum + stock.quantity,
          0
        );
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
      { headerName: 'Nombre', field: 'product.name' },
      {
        headerName: 'Color',
        field: 'product.color',
      },
      {
        headerName: 'Talla',
        field: 'product.size',
        cellStyle: { 'text-align': 'center' },
        minWidth: 80,
        maxWidth: 80,
      },
      {
        headerName: 'Precio de compra (Bs.)',
        field: 'product.purchasePrice',
        cellStyle: { 'text-align': 'center' },
        minWidth: 175,
        maxWidth: 175,
      },
      {
        headerName: 'Precio de venta (Bs.)',
        field: 'product.salePrice',
        cellStyle: { 'text-align': 'center' },
        minWidth: 165,
        maxWidth: 165,
      },
      {
        headerName: 'Cantidad',
        field: 'quantity',
        cellStyle: { 'text-align': 'center' },
        minWidth: 100,
        maxWidth: 100,
      },
      {
        cellRenderer: IconRendererComponent,
        cellRendererParams: {
          icon: 'log-in-outline',
          tooltip: 'Agregar Mercaderia',
          color: 'success',
          onAction: this.registerStockMovement.bind(
            this,
            TypeStockMovementEnum.MERCHANDISE_ENTRY
          ),
        },
        cellStyle: { 'text-align': 'center' },
        minWidth: 60,
        maxWidth: 60,
      },
      {
        cellRenderer: IconRendererComponent,
        cellRendererParams: {
          icon: 'log-out-outline',
          tooltip: 'Venta',
          color: 'info',
          onAction: this.registerStockMovement.bind(
            this,
            TypeStockMovementEnum.SALE
          ),
        },
        cellStyle: { 'text-align': 'center' },
        minWidth: 60,
        maxWidth: 60,
      },
    ];

    this.defaultColDef = { resizable: true, flex: 1 };
  }

  registerStockMovement(TypeStockMovement: string, stockId: string) {
    const stock = this.stocks.find((s) => s._id === stockId);

    const data = {
      stock: stock,
      TypeStockMovement:
        TypeStockMovement === TypeStockMovementEnum.MERCHANDISE_ENTRY
          ? TypeStockMovementEnum.MERCHANDISE_ENTRY
          : TypeStockMovementEnum.SALE,
    };

    this.dialogService
      .open(StockManagerDialogComponent, {
        context: { data },
        closeOnBackdropClick: false,
        dialogClass: 'custom-form-dialog',
      })
      .onClose.subscribe((res) => {
        if (res) {
          if (res.type === TypeStockMovementEnum.MERCHANDISE_ENTRY) {
            stock!.quantity += res.quantity;
          } else {
            stock!.quantity -= res.quantity;
          }
          this.stocks = [...this.stocks];
        }
      });
  }
}
