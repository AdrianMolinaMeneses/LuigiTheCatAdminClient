import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { MenuService } from '../../../shared/services/menu.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent implements OnInit {
  public sidebarItems: NbMenuItem[] = [];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.sidebarItems = this.menuService.getMenuItems();
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}
