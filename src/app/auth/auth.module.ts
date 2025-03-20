import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NebularThemeModule } from '../nebular-theme/nebular-theme.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [AuthLayoutComponent, LoginPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NebularThemeModule,
  ],
})
export class AuthModule {}
