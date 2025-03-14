import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
} from '@nebular/theme';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { es } from 'date-fns/locale';
import { NebularThemeModule } from './nebular-theme/nebular-theme.module';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

ModuleRegistry.registerModules([AllCommunityModule]);
registerLocaleData(localeEs);

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    AgGridModule,
    BrowserModule,
    BrowserAnimationsModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({
      format: 'dd/MM/yyyy',
      parseOptions: { locale: es },
      formatOptions: { locale: es },
    }),
    NebularThemeModule,
  ],
  providers: [provideHttpClient(), { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
