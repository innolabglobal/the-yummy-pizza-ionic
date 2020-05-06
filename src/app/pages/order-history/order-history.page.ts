import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';
import { OnViewWillEnter } from '../../interfaces/ion-lifecycle.interface';
import { OrderService } from '../../services/order.service';
import { OrderInterface } from '../../interfaces/order.interface';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit, OnViewWillEnter {

  isLoggedIn: boolean;
  orders: OrderInterface[];

  constructor(public authService: AuthService,
              public navCtrl: NavController,
              public orderService: OrderService) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.orderService.getOrders().subscribe(res => this.orders = res);
  }

  onLogoutBtnClicked() {
    this.authService.logout().subscribe(res => this.navCtrl.navigateRoot('/'));
  }
}
