import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import {
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
} from '@nebular/theme';
import { NebularThemeModule } from './nebular-theme/nebular-theme.module';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';

ModuleRegistry.registerModules([AllCommunityModule]);

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
    NebularThemeModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
