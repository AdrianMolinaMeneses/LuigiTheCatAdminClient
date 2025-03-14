import { Component, OnInit } from '@angular/core';
import { StockMovementService } from '../../services/stock-movement.service';
import { StockMovement } from '../../interfaces/stock-movement.interface';
import { ColDef } from 'ag-grid-community';
import { localeEs } from '../../../../locale-es';

@Component({
  selector: 'app-view-stock-movements-page',
  templateUrl: './view-stock-movements-page.component.html',
  styleUrl: './view-stock-movements-page.component.css',
})
export class ViewStockMovementsPageComponent implements OnInit {
  public stockMovements: StockMovement[] = [];

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

  constructor(private stockMovementService: StockMovementService) {}

  ngOnInit(): void {
    this.getStockMovements(this.startDate, this.endDate);
  }

  getStockMovements(startDate: Date, endDate: Date) {
    this.loading = true;

    this.stockMovementService.listStockMovements(startDate, endDate).subscribe({
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
}
