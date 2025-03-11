import { Injectable } from '@angular/core';
import { StockDatastoreService } from './stock-datastore.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private stockDataStoreService: StockDatastoreService) {}

  public listStocks(query: string, size: string, color: string) {
    return this.stockDataStoreService.findAll(query, size, color);
  }
}
