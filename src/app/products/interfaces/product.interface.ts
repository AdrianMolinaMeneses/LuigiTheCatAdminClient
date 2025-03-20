export interface Product {
  _id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  color: string;
  size: string;
  isActive: boolean;
  urlImages: string[];
}
