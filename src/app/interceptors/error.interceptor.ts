import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { AuthorizationService } from '@movies-services/authorization/authorization.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  // constructor(private authService: AuthorizationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {
     /* if (error.status === 401) {
        this.authService.logout();
      }*/
      return throwError(error);
    }))
  }
}
