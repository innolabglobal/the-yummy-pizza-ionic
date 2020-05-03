import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.page.html',
  styleUrls: ['./address-form.page.scss'],
})
export class AddressFormPage implements OnInit {

  address = {
    name: '',
    city: '',
    postcode: '',
    area: '',
    mobileNo: '',
    address: ''
  };

  constructor(public addressService: AddressService) { }

  ngOnInit() {
  }

  addAddress() {
    console.log(this.address);
    this.addressService.addLocalAddress(this.address);
  }
}
