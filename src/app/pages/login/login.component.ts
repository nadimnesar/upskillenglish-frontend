import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.errorMessage = '';
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = error.error.message || 'Login failed. Please try again.';
      },
      complete: () => {
        console.info('Registration process completed');
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.successMessage = 'Registration complete. Please login.';
      }
    });
  }

}
