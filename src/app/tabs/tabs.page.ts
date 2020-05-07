import { Component } from '@angular/core';
import { ScreensizeService } from '../services/screensize.service';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  isDesktop: boolean;
  isLoggedIn: boolean;
  tabs = [
    {
      tab: 'home',
      icon: 'home',
      label: 'Home',
    },
    {
      tab: 'menu',
      icon: 'list',
      label: 'Menu',
    },
    {
      tab: 'order-history',
      icon: 'information-circle',
      label: 'Order History',
    },
  ];

  constructor(private alertCtrl: AlertController,
              private authService: AuthService,
              private screensizeService: ScreensizeService,) {
    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }

      this.isDesktop = isDesktop;
    });

    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onLogoutBtnClicked() {
    this.authService.logout().subscribe(res => {
      this.isLoggedIn = this.authService.isLoggedIn();

      this.alertCtrl
        .create({
          header: 'Alert',
          subHeader: 'You have successfully logout!',
          buttons: ['OK']
        })
        .then(alert => alert.present());
    });
  }
}
