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
export class PublicGuard implements CanActivate, CanLoad {

  constructor(public authService: AuthService,
              public navCtrl: NavController) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkPublic();
  }

  canLoad(route: Route,
          segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkPublic();
  }

  protected checkPublic() {
    if (this.authService.isLoggedIn()) {
      this.navCtrl.navigateRoot('/');
    }

    return true;
  }
}
