import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  login({ login, password }: { login: string; password: string}) {
    return this.httpClient.post('auth/login', { username: login, password })
      .pipe(
        tap((data: any) => this.saveToken(data.access_token))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get token() {
    return localStorage.getItem('token');
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
