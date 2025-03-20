import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastNotificationService } from '../../../shared/services/toast-notification.service';
import { FormValidationService } from '../../../shared/services/form-validation.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup;
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastNotificationService: ToastNotificationService,
    public formValidationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.loading = true;

    this.authService.login(email, password).subscribe({
      next: (resp) => {
        this.toastNotificationService.showToast(
          'Éxito',
          `Inicio de sesión exitoso`,
          'success'
        );
        this.loading = false;
        this.router.navigateByUrl('dashboard');
      },
      error: (message) => {
        this.loading = false;
        this.toastNotificationService.showToast('Error', message, 'danger');
      },
    });
  }
}
