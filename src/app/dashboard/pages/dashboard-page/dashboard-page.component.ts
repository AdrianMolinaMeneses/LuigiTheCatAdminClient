import { Component, OnInit } from '@angular/core';
import { CashRegister } from '../../../cash-registers/interfaces/cash-register.interface';
import { CashRegisterService } from '../../../cash-registers/services/cash-register.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent implements OnInit {
  public cashRegisters: CashRegister[] = [];
  public loading: boolean = false;

  constructor(private cashRegisterService: CashRegisterService) {}

  ngOnInit(): void {
    this.getCashRegisters();
  }

  getCashRegisters() {
    this.loading = true;

    this.cashRegisterService.listCashRegisters().subscribe({
      next: (products) => {
        this.cashRegisters = products;
        this.loading = false;
      },
      error: (message) => {
        console.log(message);
        this.loading = false;
      },
    });
  }
}
