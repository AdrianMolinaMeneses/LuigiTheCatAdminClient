import { Injectable } from '@angular/core';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  constructor(private toastrService: NbToastrService) {}

  showToast(code: string, message: string, status: NbComponentStatus) {
    this.toastrService.show(code, message, { status });
  }
}
