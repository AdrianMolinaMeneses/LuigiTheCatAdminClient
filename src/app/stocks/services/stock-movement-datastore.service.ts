import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RegisterStockMovement } from '../interfaces/register-stock-movement.interface';
import { Observable } from 'rxjs';
import { StockMovement } from '../interfaces/stock-movement.interface';
import { CancelStockMovement } from '../interfaces/cancel-stock-movement.interface';

@Injectable({
  providedIn: 'root',
})
export class StockMovementDatastoreService {
  readonly baseUrl = `${environment.BACK_END_HOST}/stock-movements`;

  constructor(private http: HttpClient) {}

  register(
    registerStockMovement: RegisterStockMovement
  ): Observable<StockMovement> {
    return this.http.post<StockMovement>(this.baseUrl, registerStockMovement);
  }

  cancel(
    id: string,
    cancelStockMovement: CancelStockMovement
  ): Observable<StockMovement> {
    return this.http.patch<StockMovement>(
      `${this.baseUrl}/${id}`,
      cancelStockMovement
    );
  }

  findAll(
    startDate: string,
    endDate: string,
    typeStockMovement: string
  ): Observable<StockMovement[]> {
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    params = params.append('typeStockMovement', typeStockMovement);

    return this.http.get<StockMovement[]>(this.baseUrl, { params });
  }
}
