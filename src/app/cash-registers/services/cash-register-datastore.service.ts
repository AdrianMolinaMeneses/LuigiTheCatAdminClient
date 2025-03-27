import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CashRegister } from '../interfaces/cash-register.interface';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterDatastoreService {
  readonly baseUrl = `${environment.BACK_END_HOST}/cash-registers`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<CashRegister[]> {
    return this.http.get<CashRegister[]>(this.baseUrl);
  }
}
