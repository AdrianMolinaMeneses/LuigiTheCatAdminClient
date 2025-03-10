import { Injectable } from '@angular/core';
import { ProductDatastoreService } from './product-datastore.service';
import { RegisterProduct } from '../interfaces/register-product.interface';
import { UpdateProduct } from '../interfaces/update-product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private productDataStoreService: ProductDatastoreService) {}

  public listProducts(query: string, size: string) {
    return this.productDataStoreService.findAll(query, size);
  }

  public getProductById(id: string) {
    return this, this.productDataStoreService.findOne(id);
  }

  public registerProduct(registerProduct: RegisterProduct) {
    return this.productDataStoreService.register(registerProduct);
  }

  public updateProduct(id: string, updateProduct: UpdateProduct) {
    return this.productDataStoreService.update(id, updateProduct);
  }

  public deleteProduct(id: string) {
    return this.productDataStoreService.delete(id);
  }
}
