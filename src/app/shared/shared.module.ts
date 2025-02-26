import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NebularThemeModule } from '../nebular-theme/nebular-theme.module';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, Error404PageComponent],
  imports: [CommonModule, NebularThemeModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
