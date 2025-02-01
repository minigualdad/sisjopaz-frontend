import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnAuthenticatedGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isAuthenticated()) {
      this.router.navigate(['/app/dashboard']);
      return false;
    }

    return true;
  }
}
