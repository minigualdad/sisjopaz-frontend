// src/app/interceptors/token.interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from '../service/user.service';


export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _userService = inject(UserService);
    const token = _userService.getToken()
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
}
