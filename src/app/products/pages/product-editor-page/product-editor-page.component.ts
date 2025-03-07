import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import { ProductService } from '../../services/product.service';
import { ToastNotificationService } from '../../../shared/services/toast-notification.service';
import { RegisterProduct } from '../../interfaces/register-product.interface';
import { SizeEnum } from '../../interfaces/size-enum.interface';

@Component({
  selector: 'app-product-editor-page',
  templateUrl: './product-editor-page.component.html',
  styleUrl: './product-editor-page.component.css',
})
export class ProductEditorPageComponent implements OnInit {
  public productEditorForm!: FormGroup;
  //public productToEdit: Product;
  public textButtom!: string;
  public textHeader!: string;

  public sizes = Object.values(SizeEnum);
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastNotificationService: ToastNotificationService,
    public formValidationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.textHeader = 'Registrar Producto';
    this.textButtom = 'Guardar';
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
      size: [SizeEnum.SMALL, Validators.required],
      isActive: [true, Validators.required],
    });
  }

  sendData() {
    if (this.productEditorForm.invalid) {
      this.productEditorForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    let { isActive, ...registerProduct } = this.productEditorForm.value;
    console.log(registerProduct);
    this.registerProduct(registerProduct);
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
}
