import { Component } from '@angular/core';
import { ScreensizeService } from '../services/screensize.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  isDesktop: boolean;
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
      tab: 'about',
      icon: 'information-circle',
      label: 'About',
    },
  ];

  constructor(private screensizeService: ScreensizeService) {
    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        window.location.reload();
      }

      this.isDesktop = isDesktop;
    });
  }

}
