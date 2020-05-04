import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { OnViewWillEnter } from '../../interfaces/ion-lifecycle.interface';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.page.html',
  styleUrls: ['./address-form.page.scss'],
})
export class AddressFormPage implements OnInit, OnViewWillEnter {

  address = {
    name: '',
    city: '',
    postcode: '',
    area: '',
    mobileNo: '',
    address: ''
  };
  orderDetails: any = {};

  constructor(public activatedRoute: ActivatedRoute,
              public addressService: AddressService,
              public alertCtrl: AlertController,
              public navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.orderDetails = { ...this.activatedRoute.snapshot.queryParams };
  }

  async addAddress() {
    await this.addressService.addLocalAddress(this.address);

    const alert = await this.alertCtrl.create({
      header: 'Success',
      subHeader: 'You have successfully added a new address. Please proceed now.',
      buttons: [
        {
          text: 'OK',
          handler: () => this.navCtrl.navigateBack('/tabs/address-list', { queryParams: this.orderDetails })
        }
      ]
    });

    await alert.present();
  }
}
