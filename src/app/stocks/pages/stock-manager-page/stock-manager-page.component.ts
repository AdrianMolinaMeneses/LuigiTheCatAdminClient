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
      { headerName: 'Nombre', field: 'product.name', sortable: true },
      {
        headerName: 'Color',
        field: 'product.color',
        sortable: true,
      },
      {
        headerName: 'Talla',
        field: 'product.size',
        sortable: true,
        minWidth: 80,
        maxWidth: 80,
      },
      {
        headerName: 'Precio (Bs.)',
        field: 'product.price',
        sortable: true,
        minWidth: 120,
        maxWidth: 120,
      },
      {
        headerName: 'Cantidad',
        field: 'quantity',
        sortable: true,
        minWidth: 100,
        maxWidth: 100,
      },
      {
        cellRenderer: IconRendererComponent,
        cellRendererParams: {
          icon: 'plus-square-outline',
          tooltip: 'Agregar Mercaderia',
          color: 'success',
          onAction: this.addMerchandise.bind(this),
        },
        minWidth: 60,
        maxWidth: 60,
      },
    ];

    this.defaultColDef = { resizable: true, flex: 1 };
  }

  addMerchandise(stockId: string) {
    const stock = this.stocks.find((s) => s._id === stockId);
    console.log({ ID: stockId, STOCK: stock });

    const data = {
      stock: stock,
    };

    this.dialogService
      .open(StockManagerDialogComponent, {
        context: { data },
        closeOnBackdropClick: false,
        dialogClass: 'custom-form-dialog',
      })
      .onClose.subscribe((res) => {
        if (res) {
          console.log(res);
          this.getStocks(
            this.query,
            this.sizeControl.value!,
            this.colorControl.value!
          );
        }
      });
  }
}
