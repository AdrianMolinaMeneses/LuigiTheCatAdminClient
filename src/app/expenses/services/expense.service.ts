import { Injectable } from '@angular/core';
import { ExpenseDatastoreService } from './expense-datastore.service';
import { RegisterExpense } from '../interfaces/register-expense.interface';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private expenseDatastoreService: ExpenseDatastoreService) {}

  public listExpenses() {
    return this.expenseDatastoreService.findAll();
  }

  public registerExpense(registerExpense: RegisterExpense) {
    return this.expenseDatastoreService.register(registerExpense);
  }

  public deleteExpense(id: string) {
    return this.expenseDatastoreService.delete(id);
  }
}
