import { Injectable } from '@angular/core';
import {
  CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(public authService: AuthService,
              public navCtrl: NavController) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth();
  }

  canLoad(route: Route,
          segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuth();
  }

  protected checkAuth() {
    if (!this.authService.isLoggedIn()) {
      this.navCtrl.navigateRoot('/login');
    }

    return true;
  }
}
