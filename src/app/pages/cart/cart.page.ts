import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { OnViewWillEnter } from '../../interfaces/ion-lifecycle.interface';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnViewWillEnter {

  Cart: any[] = [];
  settings: any = {};
  subTotal: any;
  GrandTotal: any;
  total: any;

  constructor(public alertCtrl: AlertController,
              public authService: AuthService,
              public cartService: CartService,
              public navCtrl: NavController) {}

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.cartService.getCart();
    this.Cart = this.cartService.cart;
    this.recalculate();
  }

  add(data) {
    this.cartService.addItemQuantity(data);
    this.Cart = this.cartService.cart;
    this.recalculate();
  }

  deleteItem(data) {
    this.cartService.removeItem(data);
    this.Cart = this.cartService.cart;
    this.recalculate();
  }

  isCart(): boolean {
    return !(localStorage.getItem('Cart') == null || this.Cart.length === 0);
  }

  async onCheckoutBtnClicked() {
    const queryParams = {
      grandTotal: this.GrandTotal,
      subTotal: this.subTotal,
      totalVat: this.total
    };

    if (!this.authService.isLoggedIn()) {
      const alert = await this.alertCtrl.create({
        header: 'Alert',
        subHeader: 'Hi, how do you wanna continue?',
        buttons: [
          {
            text: 'Checkout as Guest',
            handler: async (data) => {
              await this.navCtrl.navigateForward('/tabs/address-list', { queryParams });
            }
          },
          {
            text: 'Checkout as Member',
            handler: async (data) => {
              await this.navCtrl.navigateRoot('/login');
            }
          }
        ]
      });
      await alert.present();
    } else {
      await this.navCtrl.navigateForward('/tabs/address-list', { queryParams });
    }
  }

  recalculate() {
    let subTotal = 0;
    const data = {
      currency: { currencyName: 'USD', currencySymbol: '$' },
      totalVat: '10'
    };
    this.settings = data;
    for (let i = 0; i <= this.Cart.length - 1; i++) {
      subTotal = subTotal + this.Cart[i].itemTotalPrice;
    }
    this.subTotal = Number(subTotal.toFixed(2));
    this.total = Number(
      (this.subTotal * this.settings.totalVat / 100).toFixed(2)
    );
    this.GrandTotal = Number((this.subTotal + this.total).toFixed(2));
  }

  remove(data) {
    this.cartService.removeItemQuantity(data);
    this.Cart = this.cartService.cart;
    this.recalculate();
  }

}
