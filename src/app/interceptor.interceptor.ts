import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
        // Clone the request object
        let newReq = req.clone();

        // Request
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local storage while logging
        // the user out from the app.
        const token = localStorage.getItem('token');
        if(token) {
          newReq = req.clone({
            headers: req.headers.set('token', token)
          });
        }

        // if ( this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken) )
        // {
        //     newReq = req.clone({
        //         headers: req.headers.set('token', this._authService.accessToken)
        //     });
        // } else if (this._authService.accessToken && AuthUtils.isTokenExpired(this._authService.accessToken)) {
        //     this._authService.signInUsingToken();
        // }

        // Response
        return next(newReq)
};
