import { Product } from '../../products/interfaces/product.interface';

export interface Stock {
  _id?: string;
  product: Product;
  quantity: number;
}
