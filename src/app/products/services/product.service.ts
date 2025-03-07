import { Injectable } from '@angular/core';
import { ProductDatastoreService } from './product-datastore.service';
import { RegisterProduct } from '../interfaces/register-product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private productDataStoreService: ProductDatastoreService) {}

  public listProducts(query: string, size: string) {
    return this.productDataStoreService.findAll(query, size);
  }

  public registerProduct(registerProduct: RegisterProduct) {
    return this.productDataStoreService.register(registerProduct);
  }
}
