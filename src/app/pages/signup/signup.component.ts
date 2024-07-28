import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  register(): void {
    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
      },
      error: (error) => {
        console.error('Registration failed', error);
      },
      complete: () => {
        console.info('Registration process completed');
      }
    });
  }
}
