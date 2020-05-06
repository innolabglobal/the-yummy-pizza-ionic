import { Injectable } from '@angular/core';
import { of } from 'rxjs';

const DUMMY_ADDRESS_LIST = [
  {
    id: 1,
    user_id: 3,
    address: 'Knesebeckstraße 75',
    area: 'Schleswig-Holstein',
    city: 'Witzhave',
    country: 'Germany',
    phone_number: '02532753469',
    name: 'Parent Home',
    post_code: '48345',
    first_name: 'Nick',
    last_name: 'Fury'
  },
  {
    id: 2,
    user_id: 3,
    address: '1058  Mapleview Drive',
    area: 'Schleswig-Holstein',
    city: 'Münsterappel',
    country: 'Germany',
    phone_number: '02532753469',
    name: 'Home',
    post_code: '48346',
    first_name: 'Peter',
    last_name: 'Parker'
  },
  {
    id: 3,
    user_id: 3,
    address: '4535  Larry Street',
    area: 'Schleswig-Holstein',
    city: 'Ostbevern',
    country: 'Germany',
    phone_number: '02532753469',
    name: 'Work',
    post_code: '48344',
    first_name: 'Sharon',
    last_name: 'Carter'
  },
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

const LOCAL_ADDRESS_STORAGE_KEY = 'LOCAL_ADDRESS';

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

  async addLocalAddress(address) {
    return this.getAllLocalAddresses().then(async (result) => {
      if (result) {
        result.push(address);
        return localStorage.setItem(LOCAL_ADDRESS_STORAGE_KEY, JSON.stringify(result));
      } else {
        return localStorage.setItem(LOCAL_ADDRESS_STORAGE_KEY, JSON.stringify([address]));
      }
    });
  }

  async getAllLocalAddresses() {
    const result = JSON.parse(localStorage.getItem(LOCAL_ADDRESS_STORAGE_KEY));
    return result ? result : [];
  }
}
