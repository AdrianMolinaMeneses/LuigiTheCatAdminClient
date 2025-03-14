import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { IconRendererComponent } from './components/icon-renderer/icon-renderer.component';
import { NebularThemeModule } from '../nebular-theme/nebular-theme.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBoxComponent } from './components/search-box/search-box.component';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    DateRangePickerComponent,
    Error404PageComponent,
    FooterComponent,
    HeaderComponent,
    IconRendererComponent,
    SearchBoxComponent,
  ],
  imports: [CommonModule, NebularThemeModule, ReactiveFormsModule],
  exports: [
    DateRangePickerComponent,
    FooterComponent,
    HeaderComponent,
    SearchBoxComponent,
  ],
})
export class SharedModule {}
