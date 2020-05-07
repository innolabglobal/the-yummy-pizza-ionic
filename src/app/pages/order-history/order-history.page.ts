import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';
import { OnViewWillEnter } from '../../interfaces/ion-lifecycle.interface';
import { OrderService } from '../../services/order.service';
import { OrderInterface } from '../../interfaces/order.interface';
import { Observable } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit, OnViewWillEnter {

  isLoggedIn: boolean;
  orders: OrderInterface[];
  selectedCurrency$: Observable<string>;

  constructor(public authService: AuthService,
              public currencyService: CurrencyService,
              public navCtrl: NavController,
              public orderService: OrderService) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.selectedCurrency$ = this.currencyService.selectedCurrency$;
    this.isLoggedIn = this.authService.isLoggedIn();
    this.orderService.getOrders().subscribe(res => this.orders = res);
  }

  onLogoutBtnClicked() {
    this.authService.logout().subscribe(res => this.navCtrl.navigateRoot('/'));
  }
}
