import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../interfaces/expense.interface';
import { Observable } from 'rxjs';
import { RegisterExpense } from '../interfaces/register-expense.interface';

@Injectable({
  providedIn: 'root',
})
export class ExpenseDatastoreService {
  readonly baseUrl = `${environment.BACK_END_HOST}/expenses`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.baseUrl);
  }

  register(registerExpense: RegisterExpense): Observable<Expense> {
    return this.http.post<Expense>(this.baseUrl, registerExpense);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
