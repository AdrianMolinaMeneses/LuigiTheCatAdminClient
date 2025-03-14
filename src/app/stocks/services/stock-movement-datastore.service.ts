import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RegisterStockMovement } from '../interfaces/register-stock-movement.interface';
import { Observable } from 'rxjs';
import { StockMovement } from '../interfaces/stock-movement.interface';

@Injectable({
  providedIn: 'root',
})
export class StockMovementDatastoreService {
  readonly baseUrl = `${environment.BACK_END_HOST}/stock-movements`;

  constructor(private http: HttpClient) {}

  register(
    registerStockMovement: RegisterStockMovement
  ): Observable<RegisterStockMovement> {
    return this.http.post<RegisterStockMovement>(
      this.baseUrl,
      registerStockMovement
    );
  }

  findAll(startDate: string, endDate: string): Observable<StockMovement[]> {
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);

    return this.http.get<StockMovement[]>(this.baseUrl, { params });
  }
}
