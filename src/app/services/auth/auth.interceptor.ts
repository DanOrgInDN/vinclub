import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  return next(req);
  // if (req.url.includes('/admin/')) {
  //   const token = authService.token;
  //   if (token) {
  //     req = req.clone({
  //       headers: req.headers.set('Authorization', `Bearer ${token}`)
  //     });
  //   }
  // }

  // return next(req);
};