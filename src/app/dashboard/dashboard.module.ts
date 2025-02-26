import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { NebularThemeModule } from '../nebular-theme/nebular-theme.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardPageComponent, DashboardLayoutComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NebularThemeModule,
    SharedModule,
  ],
})
export class DashboardModule {}
