import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';

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
        localStorage.setItem('username', response.username);
      })
    );
  }

  hasValidToken(): void {
    const token = localStorage.getItem('jwt');
    if (token != null) {
      const params = new HttpParams().set('token', token);
  
      this.http.post<{ status: boolean }>(`${this.apiUrl}/validate`, null, { params }).pipe(
        map(response => {
          if (response.status) {
            console.log('Token is valid.');
          } else {
            localStorage.removeItem('jwt');
            localStorage.removeItem('username');
            console.log('Token is invalid.');
          }
        }),
        catchError(() => {
          localStorage.removeItem('jwt');
          localStorage.removeItem('username');
          console.log('Error occurred, token removed.');
          return EMPTY;
        })
      ).subscribe();
    } else {
      console.log('No token found.');
    }
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('jwt') !== null;
  }

  getUserName(): String | null {
    return localStorage.getItem('username');
  }
}