import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuItems: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'browser-outline',
      link: '/dashboard',
    },
    {
      title: 'Productos',
      icon: 'layers-outline',
      children: [
        {
          title: 'Agregar producto',
          link: '/products/add-product',
        },
        {
          title: 'Lista de productos',
          link: '/products/view-products',
        },
      ],
    },
    {
      title: 'Stocks',
      icon: 'keypad-outline',
      children: [
        {
          title: 'Administracion de stocks',
          link: '/stocks/stock-manager',
        },
        {
          title: 'Movimientos de stock',
          link: '/stocks/view-stock-movements',
        },
      ],
    },
    {
      title: 'Gastos',
      icon: 'external-link-outline',
      link: '/expenses/view-expenses',
    },
  ];

  getMenuItems(): NbMenuItem[] {
    return this.menuItems;
  }
}
