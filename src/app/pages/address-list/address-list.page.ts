import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AddressService } from '../../services/address.service';
import { OnViewWillEnter } from '../../models/ion-lifecycle';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.page.html',
  styleUrls: ['./address-list.page.scss'],
})
export class AddressListPage implements OnInit, OnViewWillEnter {

  addressList: any = [];
  cart: Array<any>;
  grandTotal: any;
  orderDetails: any = {};
  postcodes: Array<any>;
  postcodeMatched = false;

  constructor(public activatedRoute: ActivatedRoute,
              public addressService: AddressService,
              public alertCtrl: AlertController,
              public cartService: CartService,
              public navCtrl: NavController) {
    this.addressService.getDeliverablePostcode().subscribe(
      res => this.postcodes = res
    );

    this.cartService.getCart();
    this.orderDetails.cart = this.cartService.cart;
  }

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.orderDetails = { ...this.activatedRoute.snapshot.queryParams };

    this.addressService.getAddressList().subscribe(res => this.addressList = res);

    if (this.orderDetails.grandTotal === undefined) {
      this.navCtrl.navigateBack('/cart');
    }
  }

  selectAddress(event) {
    const address = event.detail.value;

    this.postcodeMatched = false;
    this.orderDetails = {
      ...this.orderDetails,
      shippingAddress: address
    };

    for (let i = 0; i < this.postcodes.length; i++) {
      if (this.postcodes[i].postcode === Number(address.postcode)) {
        this.postcodeMatched = true;
      }
    }
  }

  async checkOut() {
    this.orderDetails.orderView = false;

    if (this.orderDetails.shippingAddress && this.postcodeMatched) {
      await this.navCtrl.navigateForward('/tabs/checkout', { queryParams: this.orderDetails });
    } else if (this.postcodeMatched === false) {
      await this.showAlert('We can not deliver to this area yet. Stay tuned!');
    } else {
      await this.showAlert('Please select your address to proceed.');
    }
  }

  async showAlert(message) {
    const alert = await this.alertCtrl.create({
      header: 'Alert!',
      subHeader: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
