import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import { ProductService } from '../../services/product.service';
import { ToastNotificationService } from '../../../shared/services/toast-notification.service';
import { RegisterProduct } from '../../interfaces/register-product.interface';
import { SizeEnum } from '../../interfaces/size-enum.interface';
import { ActivatedRoute } from '@angular/router';
import { UpdateProduct } from '../../interfaces/update-product.interface';
import { ColorEnum } from '../../interfaces/color-enum.interface';

@Component({
  selector: 'app-product-editor-page',
  templateUrl: './product-editor-page.component.html',
  styleUrl: './product-editor-page.component.css',
})
export class ProductEditorPageComponent implements OnInit {
  public productEditorForm!: FormGroup;
  public productId: string = '';
  public textButtom!: string;
  public textHeader!: string;

  public colors = Object.values(ColorEnum);
  public sizes = Object.values(SizeEnum);
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastNotificationService: ToastNotificationService,
    private route: ActivatedRoute,
    public formValidationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.registerOrUpdate();
  }

  buildForm() {
    this.productEditorForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: ['', Validators.maxLength(500)],
      price: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100000)],
      ],
      color: [ColorEnum.AZUL_MARINO, Validators.required],
      size: [SizeEnum.SMALL, Validators.required],
      isActive: [true, Validators.required],
    });
  }

  registerOrUpdate() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.loading = true;
        this.productId = params.get('id')!;
        this.productService.getProductById(this.productId).subscribe({
          next: (product) => {
            this.productEditorForm.reset(product);
            this.textHeader = 'Editar Producto';
            this.textButtom = 'Actualizar';
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
      } else {
        this.textHeader = 'Registrar Producto';
        this.textButtom = 'Guardar';
      }
    });
  }

  sendData() {
    if (this.productEditorForm.invalid) {
      this.productEditorForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    if (this.productId) {
      this.updateProduct(this.productEditorForm.value);
    } else {
      let { isActive, ...registerProduct } = this.productEditorForm.value;
      this.registerProduct(registerProduct);
    }
  }

  registerProduct(registerProduct: RegisterProduct) {
    this.productService.registerProduct(registerProduct).subscribe({
      next: (product) => {
        this.toastNotificationService.showToast(
          'Éxito',
          `Se agrego el producto ${product.name}`,
          'success'
        );
        this.productEditorForm.reset({
          name: '',
          price: 0,
          description: '',
          color: ColorEnum.AZUL_MARINO,
          size: SizeEnum.SMALL,
          isActive: true,
        });
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

  updateProduct(updateProduct: UpdateProduct) {
    this.productService.updateProduct(this.productId, updateProduct).subscribe({
      next: (product) => {
        this.toastNotificationService.showToast(
          'Éxito',
          `Se actualizo el producto ${product.name}`,
          'success'
        );
        this.productEditorForm.reset(product);
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
}
