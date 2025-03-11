import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Stock } from '../interfaces/stock.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockDatastoreService {
  readonly baseUrl = `${environment.BACK_END_HOST}/stocks`;

  constructor(private http: HttpClient) {}

  findAll(query: string, size: string, color: string): Observable<Stock[]> {
    let params = new HttpParams();
    params = params.append('query', query);
    params = params.append('size', size);
    params = params.append('color', color);

    return this.http.get<Stock[]>(this.baseUrl, { params });
  }
}
