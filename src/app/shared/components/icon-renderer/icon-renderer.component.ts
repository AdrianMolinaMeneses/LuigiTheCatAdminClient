import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-icon-renderer',
  templateUrl: './icon-renderer.component.html',
  styleUrl: './icon-renderer.component.css',
})
export class IconRendererComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  onClick() {
    const productId = this.params.data._id;

    if (this.params.onAction) {
      this.params.onAction(productId);
    }
  }

  refresh(): boolean {
    return false;
  }
}
