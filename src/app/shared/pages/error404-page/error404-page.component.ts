import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404-page',
  templateUrl: './error404-page.component.html',
  styleUrl: './error404-page.component.css',
})
export class Error404PageComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigateByUrl('/dashboard');
  }
}
