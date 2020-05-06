import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { OnViewWillEnter } from '../../interfaces/ion-lifecycle.interface';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../../services/checkout.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit, OnViewWillEnter {

  order: any = {};
  paymentType: string;
  paymentTypes = [];

  constructor(public activatedRoute: ActivatedRoute,
              public alertCtrl: AlertController,
              public cartService: CartService,
              public navCtrl: NavController,
              private checkoutService: CheckoutService) {
    this.order = { ...this.activatedRoute.snapshot.queryParams };
  }

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.checkoutService.getPaymentTypes().subscribe(res => this.paymentTypes = res);
  }

  choosePaymentType(event) {
    this.paymentType = event.detail.value;
  }

  async onCheckoutBtnClicked() {
    this.order.status = 'pending';
    this.order.paymentStatus = 0;
    this.cartService.getCart();

    if (this.paymentType === 'Braintree') {
      this.order.paymentStatus = 1;
    } else if (this.paymentType === 'Stripe') {
      this.order.paymentStatus = 1;
    } else {
      this.order.paymentStatus = 0;
    }

    const carts = {
      ...this.cartService.cart.map(cartItem => {
        return {
          id: cartItem.item.itemId,
          title: cartItem.item.title,
          price: cartItem.item.price.value,
          quantity: cartItem.item.itemQuantity,
          price_option_id: cartItem.item.price.id
        };
      })
    };

    const body = {
      first_name: this.order.first_name,
      last_name: this.order.last_name,
      address: this.order.address,
      city: this.order.city,
      country: this.order.country,
      post_code: this.order.post_code,
      phone_number: this.order.phone_number,
      payment_method: this.paymentType,
      payment_status: this.order.paymentStatus,
      notes: this.order.notes || null,
      carts
    };

    const alert = await this.alertCtrl.create({
      header: 'Thanks!',
      subHeader: 'Thanks for your order. We shall deliver to you within 30 minutes. Stay tuned.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.cartService.clearCart();
            this.navCtrl.navigateRoot('/tabs/menu');
          }
        }
      ],
    });

    this.checkoutService.checkout(body).subscribe(res => alert.present());
  }
}
