import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

  loading;

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.presentLoading();

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }

        this.hideLoader();
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.hideLoader();
        return throwError(error);
      }));
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });

    this.loading.onDidDismiss().then((dis) => {
      console.log('Loading dismissed!');
    });

    await this.loading.present();

  }

  async hideLoader() {
    // TODO: there could be better logic for this
    const interval = setInterval(async () => {
      if (this.loading) {
        await this.loading.dismiss();
        clearInterval(interval);
      }
    }, 500);
  }
}
