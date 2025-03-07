import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NebularThemeModule } from '../nebular-theme/nebular-theme.module';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { IconRendererComponent } from './components/icon-renderer/icon-renderer.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    Error404PageComponent,
    IconRendererComponent,
    SearchBoxComponent,
  ],
  imports: [CommonModule, NebularThemeModule, ReactiveFormsModule],
  exports: [HeaderComponent, FooterComponent, SearchBoxComponent],
})
export class SharedModule {}
