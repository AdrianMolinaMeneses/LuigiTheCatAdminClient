import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Stock } from '../../interfaces/stock.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import { RegisterStockMovement } from '../../interfaces/register-stock-movement.interface';
import { TypeStockMovementEnum } from '../../interfaces/type-stock-movement-enum.interface';
import { StockMovementService } from '../../services/stock-movement.service';
import { ToastNotificationService } from '../../../shared/services/toast-notification.service';
import { TimezoneService } from '../../../shared/services/timezone.service';

@Component({
  selector: 'app-stock-manager-dialog',
  templateUrl: './stock-manager-dialog.component.html',
  styleUrl: './stock-manager-dialog.component.css',
})
export class StockManagerDialogComponent implements OnInit {
  @Input() data?: any;
  public stock!: Stock;
  public myForm!: FormGroup;
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private stockMovementService: StockMovementService,
    private timeZoneService: TimezoneService,
    private toastNotificationService: ToastNotificationService,
    protected ref: NbDialogRef<StockManagerDialogComponent>,
    public formValidationService: FormValidationService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.stock = this.data.stock;
    this.buildForm();

    this.myForm.get('unitPrice')?.valueChanges.subscribe(() => {
      this.calculateTotalAmount();
    });

    this.myForm.get('quantity')?.valueChanges.subscribe(() => {
      this.calculateTotalAmount();
    });
  }

  buildForm() {
    this.myForm = this.fb.group({
      registerDate: [new Date()],
      quantity: [
        1,
        [Validators.required, Validators.min(1), Validators.max(100000)],
      ],
      unitPrice: [
        1,
        [Validators.required, Validators.min(1), Validators.max(100000)],
      ],
      totalAmount: [1],
    });
  }

  calculateTotalAmount() {
    const unitPrice = this.myForm.get('unitPrice')?.value;
    const quantity = this.myForm.get('quantity')?.value;

    const totalPrice = unitPrice * quantity;
    this.myForm.get('totalAmount')?.setValue(totalPrice, { emitEvent: false });
  }

  close() {
    this.ref.close(false);
  }

  sendData() {
    const newStockMovement: RegisterStockMovement = {
      stock: this.stock._id!,
      registerDate: this.timeZoneService.convertDateToLocalTime(
        new Date(this.myForm.value.registerDate)
      ),
      type: TypeStockMovementEnum.ENTRY,
      quantity: this.myForm.value.quantity,
      unitPrice: this.myForm.value.unitPrice,
      totalAmount: this.myForm.value.totalAmount,
      description: `Ingreso de mercaderia`,
    };

    this.loading = true;

    this.stockMovementService
      .registerStockMovement(newStockMovement)
      .subscribe({
        next: (stockMovement) => {
          this.toastNotificationService.showToast(
            'Éxito',
            `Se actualizo el stock del producto ${this.stock.product.name}`,
            'success'
          );
          this.myForm.reset();
          this.loading = false;
          this.ref.close(true);
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
