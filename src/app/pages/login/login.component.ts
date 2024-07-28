import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
/**
 * To use ngOnInit, your component class needs to implement the OnInit interface, which is part of Angular's core package.
 */
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  /**
   * In RxJS, the subscribe method is used to listen to the emitted values, errors, and completion notifications from an Observable.
   * next: This is called whenever the Observable emits a value.
   * error: This is called if the Observable encounters an error.
   * complete: This is called when the Observable completes its sequence of emissions.
   */
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

  /**
   * The ngOnInit method is a lifecycle hook provided by Angular.
   * It is called by Angular once the component's data-bound properties have been initialized.
   * This is a good place to put initialization logic for your component, such as fetching data from a service,
   * setting up initial states, or subscribing to observables.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.successMessage = 'Registration complete. Please login.';
      }
    });
  }

}
