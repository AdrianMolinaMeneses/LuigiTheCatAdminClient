import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userMenuItems: NbMenuItem[] = [
    //{ title: 'Cambiar contraseña', data: { id: 'change-password' } },
    { title: 'Cerrar sesión', data: { id: 'logout' } },
  ];
  public menuSubscription: any;

  constructor(
    private nbMenuService: NbMenuService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.menuSubscription = this.nbMenuService
      .onItemClick()
      .subscribe((event) => {
        if (event.item.data && event.item.data.id === 'logout') {
          this.onLogout();
        }
      });
  }

  get user() {
    return this.authService.getStorageUser();
  }

  ngOnDestroy(): void {
    this.menuSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
