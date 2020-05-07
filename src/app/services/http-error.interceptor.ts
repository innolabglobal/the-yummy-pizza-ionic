import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private alertCtrl: AlertController,
              private authService: AuthService,
              private navCtrl: NavController,
              private toastCtrl: ToastController) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(`Backend returned code ${err.status}, body was: ${JSON.stringify(err.error)}`);
        }

        if (err.error.error === 'Unauthenticated.') {
          this.alertCtrl
            .create({
              header: 'Alert',
              subHeader: 'You are not login yet or your login session is timeout. Please login again!',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.authService.removeLocalStorage();
                    this.navCtrl.navigateRoot('/login');
                  }
                }
              ]
            })
            .then(alert => alert.present());
        } else {
          this.toastCtrl
            .create({
              message: 'There is something wrong with the server... please try again later...',
              duration: 4000,
            })
            .then(toast => toast.present());
        }

        // ...optionally return a default fallback value so app can continue (pick one)
        // which could be a default value (which has to be a HttpResponse here)
        // return Observable.of(new HttpResponse({body: [{name: "Default value..."}]}));
        // or simply an empty observable
        return of<HttpEvent<any>>();
      }));
  }
}
