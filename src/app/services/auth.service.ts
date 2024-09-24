import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.backendUrl + '/api/auth';

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

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