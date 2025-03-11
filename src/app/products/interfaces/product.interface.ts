export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  color: string;
  size: string;
  isActive: boolean;
  urlImages: string[];
}
