import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.roleName === 'ADMIN') {
      return true;
    }

    this.router.navigate(['/vinclub']);
    return false;
  }
}