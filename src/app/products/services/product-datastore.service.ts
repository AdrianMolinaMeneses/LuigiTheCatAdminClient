import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { RegisterProduct } from '../interfaces/register-product.interface';
import { UpdateProduct } from '../interfaces/update-product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductDatastoreService {
  readonly baseUrl = `${environment.BACK_END_HOST}/products`;

  constructor(private http: HttpClient) {}

  findAll(query: string, size: string): Observable<Product[]> {
    //let params = new HttpParams().set('searchParam', searchParam);
    let params = new HttpParams();
    params = params.append('query', query);
    params = params.append('size', size);

    return this.http.get<Product[]>(this.baseUrl, { params: params });
  }

  findOne(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  register(registerProduct: RegisterProduct): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, registerProduct);
  }

  update(id: string, updateProduct: UpdateProduct): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}`, updateProduct);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
