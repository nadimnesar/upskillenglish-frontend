import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router) { }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  isHomeRoute(): boolean {
    return this.router.url === '/';
  }

  isSignupRoute(): boolean {
    return this.router.url === '/signup';
  }

  isLeaderboardRoute(): boolean {
    return this.router.url === '/leaderboard';
  }
}
