import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.errorMessage = '';
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.errorMessage = error.error.message || 'Registration failed. Please try again.';
      },
      complete: () => {
        console.info('Registration process completed');
      }
    });
  }
}
