import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  /**
 * JavaScript is a single-threaded language, so an HTTP request failure can block the entire thread.
 * To execute HTTP requests without blocking or killing the main thread, we use asynchronous programming.
 * This can be achieved using either Observables or Promises. Promises wait until the HTTP request is complete and
 * return a single value, while Observables can provide data over time.
 * 
 * Observables are a fundamental part of the RxJS library in Angular. They represent a sequence of values over time
 * and can stream data as it arrives.
 */
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  /**
   * .pipe: This method combines multiple operators into a single observable chain.
   * Operators are functions that process the data emitted by observables.
   * 
   * tap: This RxJS operator allows you to perform side effects for notifications from the source observable.
   * It does not modify the observable stream but can be used to perform actions based on the stream's data.
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('jwt', response.jwt);
      })
    );
  }

  getJwtToken(): string | null {
    return localStorage.getItem('jwt');
  }

  logout(): void {
    localStorage.removeItem('jwt');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('jwt') !== null;
  }
}