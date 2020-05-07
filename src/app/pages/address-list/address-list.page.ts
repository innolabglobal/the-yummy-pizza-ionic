import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AddressService } from '../../services/address.service';
import { OnViewWillEnter } from '../../interfaces/ion-lifecycle.interface';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { AddressInterface } from '../../interfaces/address.interface';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.page.html',
  styleUrls: ['./address-list.page.scss'],
})
export class AddressListPage implements OnInit, OnViewWillEnter {

  addressList: AddressInterface[] = [];
  cart: Array<any>;
  grandTotal: any;
  orderDetails: any = {};
  deliverablePostcodes: Array<any>;
  postcodeMatched = false;

  constructor(public activatedRoute: ActivatedRoute,
              public addressService: AddressService,
              public alertCtrl: AlertController,
              public authService: AuthService,
              public cartService: CartService,
              public navCtrl: NavController) {
    this.addressService.getDeliverablePostcode().subscribe(
      res => this.deliverablePostcodes = res
    );

    this.cartService.getCart();
    this.orderDetails.cart = this.cartService.cart;
  }

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.orderDetails = { ...this.activatedRoute.snapshot.queryParams };

    if (this.authService.isLoggedIn()) {
      this.addressService.getAddressList().subscribe(res => this.addressList = res);
    } else {
      this.addressService.getAllLocalAddresses().then(res => this.addressList = res);
    }

    if (this.orderDetails.grandTotal === undefined) {
      this.navCtrl.navigateBack('/tabs/cart');
    }
  }

  selectAddress(event) {
    const address = event.detail.value;

    this.postcodeMatched = false;
    this.orderDetails = {
      ...this.orderDetails,
      shippingAddress: address
    };
    this.orderDetails = Object.assign(this.orderDetails, address);

    this.deliverablePostcodes.forEach(item => {
      if (Number(item.post_code) === Number(address.post_code)) {
        this.postcodeMatched = true;
        this.orderDetails.delivery_fees = item.delivery_fees;
      }
    });
  }

  async checkOut() {
    this.orderDetails.orderView = false;
    this.orderDetails.finalTotal = Number(this.orderDetails.subTotal) + Number(this.orderDetails.totalVat) + Number(this.orderDetails.delivery_fees);

    if (this.orderDetails.shippingAddress && this.postcodeMatched) {
      await this.navCtrl.navigateForward('/tabs/checkout', { queryParams: this.orderDetails });
    } else if (this.orderDetails.shippingAddress && this.postcodeMatched === false) {
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
