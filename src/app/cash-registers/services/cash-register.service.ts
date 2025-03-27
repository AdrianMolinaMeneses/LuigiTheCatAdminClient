import { Injectable } from '@angular/core';
import { CashRegisterDatastoreService } from './cash-register-datastore.service';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterService {
  constructor(
    private cashRegisterDatastoreService: CashRegisterDatastoreService
  ) {}

  public listCashRegisters() {
    return this.cashRegisterDatastoreService.findAll();
  }
}
