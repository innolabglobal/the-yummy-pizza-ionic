import { Injectable } from '@angular/core';
import { of } from 'rxjs';

const DUMMY_ADDRESS_LIST = [
  {
    address: 'Knesebeckstraße 75',
    area: 'Schleswig-Holstein',
    city: 'Witzhave',
    mobileNo: '02532753469',
    name: 'Parent Home',
    postcode: '48345'
  },
  {
    address: '1058  Mapleview Drive',
    area: 'Schleswig-Holstein',
    city: 'Münsterappel',
    mobileNo: '02532753469',
    name: 'Home',
    postcode: '48346'
  },
  {
    address: '4535  Larry Street',
    area: 'Schleswig-Holstein',
    city: 'Ostbevern',
    mobileNo: '02532753469',
    name: 'Work',
    postcode: '48344'
  }
];

const DUMMY_DELIVERABLE_POSTCODE = [
  { postcode: 48346 },
  { postcode: 56075 },
  { postcode: 57401 },
  { postcode: 57476 },
  { postcode: 57146 },
  { postcode: 57125 },
  { postcode: 57480 },
  { postcode: 57101 },
  { postcode: 78900 },
  { postcode: 57101 },
  { postcode: 57475 },
  { postcode: 67895 },
];

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor() { }

  getAddressList() {
    return of(DUMMY_ADDRESS_LIST);
  }

  getDeliverablePostcode() {
    return of(DUMMY_DELIVERABLE_POSTCODE);
  }
}
