import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbToggleModule,
  NbTooltipModule,
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
    NbMenuModule,
    NbSidebarModule,
    NbSpinnerModule,
    NbSelectModule,
    NbInputModule,
    NbTooltipModule,
    NbToggleModule,
  ],
})
export class NebularThemeModule {}
