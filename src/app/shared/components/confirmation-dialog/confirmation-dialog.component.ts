import { Component, Inject, Input, OnInit } from '@angular/core';
import { NB_DIALOG_CONFIG, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css',
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() data?: any;
  public textHeader: string = '';
  public message: string = '';

  constructor(protected ref: NbDialogRef<ConfirmationDialogComponent>) {}

  ngOnInit(): void {
    this.textHeader = this.data.textHeader;
    this.message = this.data.message;
  }

  close() {
    this.ref.close(false);
  }

  confirm() {
    this.ref.close(true);
  }
}
