import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpCsrfInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private tokenService: HttpXsrfTokenExtractor) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({
      withCredentials: true,
    });

    const headerName = 'X-XSRF-TOKEN';
    const csrfToken = this.tokenService.getToken();

    if (csrfToken !== null && !req.headers.has(headerName)) {
      req = req.clone({
        headers: req.headers.set(headerName, csrfToken),
      });
    }

    const accessToken = this.authService.token();

    if (accessToken) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
      });
    }

    return next.handle(req);
  }
}
