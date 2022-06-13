import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../store/users/models';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public get isLoggedIn(): boolean {
    return !!this.token;
  }

  public get token() {
    return localStorage.getItem('token');
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  public login({ login, password }: { login: string; password: string}) {
    return this.httpClient.post('auth/login', { username: login, password })
      .pipe(
        tap((data: any) => this.saveToken(data.access_token))
      );
  }

  public register(user:  Omit<User, 'id'> & { password: string }) {
    return this.httpClient.post('auth/register', { user }).pipe(
      tap(() => this.router.navigate(['/login'])));
  }

  public logout(): void {
    localStorage.removeItem('token');
    window.location.replace('/login');
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
