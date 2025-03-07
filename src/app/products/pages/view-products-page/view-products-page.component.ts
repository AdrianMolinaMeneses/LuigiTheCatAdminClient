import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { ColDef } from 'ag-grid-community';
import { localeEs } from '../../../../locale-es';
import { IconRendererComponent } from '../../../shared/components/icon-renderer/icon-renderer.component';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SizeEnum } from '../../interfaces/size-enum.interface';

@Component({
  selector: 'app-view-products-page',
  templateUrl: './view-products-page.component.html',
  styleUrl: './view-products-page.component.css',
})
export class ViewProductsPageComponent implements OnInit {
  public products: Product[] = [];
  public sizeControl = new FormControl('');
  public sizes = Object.values(SizeEnum);
  private query: string = '';

  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {};
  public localeText = localeEs;

  public loading: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts('', '');
    this.loadTable();

    this.sizeControl.valueChanges.subscribe((value) => {
      this.getProducts(this.query, value!);
    });
  }

  getProducts(query: string, size: string) {
    this.loading = true;
    this.query = query;

    this.productService.listProducts(query, size).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (message) => {
        console.log(message);
        this.loading = false;
      },
    });
  }

  loadTable() {
    this.columnDefs = [
      { headerName: 'Nombre', field: 'name', sortable: true },
      {
        headerName: 'Talla',
        field: 'size',
        sortable: true,
        minWidth: 80,
        maxWidth: 80,
      },
      {
        headerName: 'Precio',
        field: 'price',
        sortable: true,
        minWidth: 80,
        maxWidth: 80,
      },
      {
        headerName: 'Descripción',
        field: 'description',
        sortable: true,
      },
      {
        cellRenderer: IconRendererComponent,
        cellRendererParams: {
          icon: 'edit-2-outline',
          tooltip: 'Editar',
          color: 'info',
          onAction: this.editProduct.bind(this),
        },
        minWidth: 60,
        maxWidth: 60,
      },
      {
        cellRenderer: IconRendererComponent,
        cellRendererParams: {
          icon: 'trash-2-outline',
          tooltip: 'Eliminar',
          color: 'danger',
          onAction: this.deleteProduct.bind(this),
        },
        minWidth: 60,
        maxWidth: 60,
      },
    ];

    this.defaultColDef = { resizable: true, flex: 1 };
  }

  editProduct(productId: string) {
    this.router.navigateByUrl(`products/edit-product/${productId}`);
  }

  deleteProduct(productId: string) {
    console.log(productId);
  }
}
