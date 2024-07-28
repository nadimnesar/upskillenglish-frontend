import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

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