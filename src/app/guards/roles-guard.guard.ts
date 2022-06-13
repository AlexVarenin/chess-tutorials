import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UsersStoreService } from '../store/users/services/users-store.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuardGuard implements CanActivateChild {

  constructor(
    private router: Router,
    private usersStoreService: UsersStoreService
  ) {
    this.usersStoreService.requestUserMe();
  }

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const allowedForRoles = route.data['roles'];
    const redirectTo = route.data['redirectTo'];

    return this.usersStoreService.userMe$.pipe(
      map(({ role }) => allowedForRoles.includes(role)),
      tap(isAllowed => {
        if (!isAllowed) {
          this.router.navigate([redirectTo]);
        }
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.canActivate(route);
  }
  
}
