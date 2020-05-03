import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { OnViewWillEnter } from '../../models/ion-lifecycle';
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
  userId: any;
  userDetails: any = {
    email: '',
    name: '',
    userid: ''
  };
  paymentType: string;
  paymentDetails: any = {
    paymentStatus: true
  };
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

  choosePaymentType(paymentType) {
    this.paymentType = paymentType;
    this.order.paymentType = paymentType;
    this.paymentDetails.paymentType = paymentType;
  }

  async onCheckOut() {
    this.order.orderId = Math.floor(Math.random() * 90000) + 10000;
    this.order.userDetails = this.userDetails;
    this.order.userId = this.userId;
    this.order.createdAt = Date.now();
    this.order.status = 'pending';
    this.order.paymentStatus = 'pending';
    delete this.order.shippingAddress.$key;
    this.order.statusReading = [
      {
        title: 'Your order has been accepted.You will get notified the status here.',
        time: Date.now()
      }
    ];

    if (this.paymentType === 'Braintree') {
    } else if (this.paymentType === 'Stripe') {
    } else {
    }

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

    await alert.present();
  }
}
