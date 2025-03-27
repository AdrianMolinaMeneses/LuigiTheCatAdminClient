import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimezoneService } from '../../../shared/services/timezone.service';
import { ToastNotificationService } from '../../../shared/services/toast-notification.service';
import { NbDialogRef } from '@nebular/theme';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import { ExpenseService } from '../../services/expense.service';
import { RegisterExpense } from '../../interfaces/register-expense.interface';

@Component({
  selector: 'app-register-expense-dialog',
  templateUrl: './register-expense-dialog.component.html',
  styleUrl: './register-expense-dialog.component.css',
})
export class RegisterExpenseDialogComponent implements OnInit {
  public myForm!: FormGroup;
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private timeZoneService: TimezoneService,
    private toastNotificationService: ToastNotificationService,
    protected ref: NbDialogRef<RegisterExpenseDialogComponent>,
    public formValidationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.myForm = this.fb.group({
      registerDate: [new Date()],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      amount: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100000)],
      ],
    });
  }

  close() {
    this.ref.close(false);
  }

  sendData() {
    const newExpense: RegisterExpense = {
      registerDate: this.timeZoneService.convertDateToLocalTime(
        new Date(this.myForm.value.registerDate)
      ),
      description: this.myForm.value.description,
      amount: this.myForm.value.amount,
    };

    this.loading = true;

    this.expenseService.registerExpense(newExpense).subscribe({
      next: (expense) => {
        this.toastNotificationService.showToast(
          'Éxito',
          `Se registró el gasto`,
          'success'
        );
        this.myForm.reset();
        this.loading = false;
        this.ref.close(expense);
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
