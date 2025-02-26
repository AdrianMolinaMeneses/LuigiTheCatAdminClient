import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  exports: [
    CommonModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbContextMenuModule,
    NbEvaIconsModule,
    NbIconModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
  ],
})
export class NebularThemeModule {}
