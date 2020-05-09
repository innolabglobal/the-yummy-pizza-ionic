import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.loadingCtrl.create())
      .pipe(
        tap((loading) => {
          return loading.present();
        }),
        switchMap((loading) => {
          return next.handle(request).pipe(
            finalize(() => {
              loading.dismiss();
            })
          );
        })
      );

  }
}
