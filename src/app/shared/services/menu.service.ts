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
          link: '/products/products-list',
        },
      ],
    },
  ];

  getMenuItems(): NbMenuItem[] {
    return this.menuItems;
  }
}
