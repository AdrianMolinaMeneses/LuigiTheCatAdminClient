import { Injectable } from '@angular/core';
import { StockMovementDatastoreService } from './stock-movement-datastore.service';
import { RegisterStockMovement } from '../interfaces/register-stock-movement.interface';

@Injectable({
  providedIn: 'root',
})
export class StockMovementService {
  constructor(
    private stockMovementDatastoreService: StockMovementDatastoreService
  ) {}

  public registerStockMovement(registerStockMovement: RegisterStockMovement) {
    return this.stockMovementDatastoreService.register(registerStockMovement);
  }

  public listStockMovements(startDate: Date, endDate: Date) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(23, 59, 59, 999);

    return this.stockMovementDatastoreService.findAll(
      start.toISOString(),
      end.toISOString()
    );
  }
}
