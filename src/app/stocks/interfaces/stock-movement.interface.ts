import { Stock } from './stock.interface';

export interface StockMovement {
  _id?: string;
  stock: Stock;
  registerDate: Date;
  type: string;
  status: boolean;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  description: string;
}
