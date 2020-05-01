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
      tab: 'tab1',
      icon: 'flash',
      label: 'Tab 1',
    },
    {
      tab: 'tab2',
      icon: 'flash',
      label: 'Tab 2',
    },
    {
      tab: 'tab3',
      icon: 'flash',
      label: 'Tab 3',
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
