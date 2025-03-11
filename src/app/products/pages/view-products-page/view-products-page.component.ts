import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { ColDef } from 'ag-grid-community';
import { localeEs } from '../../../../locale-es';
import { IconRendererComponent } from '../../../shared/components/icon-renderer/icon-renderer.component';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SizeEnum } from '../../interfaces/size-enum.interface';
import { NbDialogService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastNotificationService } from '../../../shared/services/toast-notification.service';
import { ColorEnum } from '../../interfaces/color-enum.interface';

@Component({
  selector: 'app-view-products-page',
  templateUrl: './view-products-page.component.html',
  styleUrl: './view-products-page.component.css',
})
export class ViewProductsPageComponent implements OnInit {
  public products: Product[] = [];
  public colorControl = new FormControl('');
  public sizeControl = new FormControl('');
  public colors = Object.values(ColorEnum);
  public sizes = Object.values(SizeEnum);
  private query: string = '';

  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {};
  public localeText = localeEs;

  public loading: boolean = false;

  constructor(
    private productService: ProductService,
    private toastNotificationService: ToastNotificationService,
    private router: Router,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.getProducts('', '', '');
    this.loadTable();

    this.colorControl.valueChanges.subscribe((value) => {
      this.getProducts(this.query, this.sizeControl.value!, value!);
    });

    this.sizeControl.valueChanges.subscribe((value) => {
      this.getProducts(this.query, value!, this.colorControl.value!);
    });
  }

  getProducts(query: string, size: string, color: string) {
    this.loading = true;
    this.query = query;

    this.productService.listProducts(query, size, color).subscribe({
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
        headerName: 'Color',
        field: 'color',
        sortable: true,
      },
      {
        headerName: 'Talla',
        field: 'size',
        sortable: true,
        minWidth: 80,
        maxWidth: 80,
      },
      {
        headerName: 'Precio (Bs.)',
        field: 'price',
        sortable: true,
        minWidth: 120,
        maxWidth: 120,
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
    let product = this.products.find((p) => p._id === productId);

    const data = {
      textHeader: 'Eliminar Producto',
      message: `¿Esta seguro de eliminar el producto ${product?.name} color ${product?.color} talla ${product?.size}?<br><br>Se borrara tanto el producto como el stock asociado.`,
    };

    this.dialogService
      .open(ConfirmationDialogComponent, {
        context: { data },
        closeOnBackdropClick: false,
        dialogClass: 'custom-confirmation-dialog',
      })
      .onClose.subscribe((resultado) => {
        if (resultado) {
          this.loading = true;
          this.productService.deleteProduct(productId).subscribe({
            next: () => {
              this.toastNotificationService.showToast(
                'Éxito',
                `Se elimino el producto`,
                'success'
              );
              this.products = this.products.filter(
                (product) => product._id !== productId
              );
              this.loading = false;
            },
            error: (err) => {
              this.toastNotificationService.showToast(
                'Error',
                err.error.message,
                'danger'
              );
              this.loading = false;
            },
          });
        }
      });
  }
}
