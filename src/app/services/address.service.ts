import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { AddressInterface } from '../interfaces/address.interface';
import { ApiResponseInterface } from '../interfaces/api-response.interface';
import { AuthService } from './auth.service';

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
    post_code: '80333',
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

const LOCAL_ADDRESS_STORAGE_KEY = 'LOCAL_ADDRESS';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(public authService: AuthService,
              public http: HttpClient) { }

  addAddress(address) {
    if (this.authService.isLoggedIn()) {
      return this.addMemberAddress(address).toPromise();
    } else {
      return this.addLocalAddress(address);
    }
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

  addMemberAddress(body) {
    return this.http.post(`${environment.apiBaseUrl}/api/own/addresses`, body);
  }

  getAddressList(): Observable<AddressInterface[]> {
    return this.http
      .get(`${environment.apiBaseUrl}/api/own/addresses`)
      .pipe(map((res: ApiResponseInterface) => res.data));
  }

  async getAllLocalAddresses() {
    const result = JSON.parse(localStorage.getItem(LOCAL_ADDRESS_STORAGE_KEY));
    result.concat(DUMMY_ADDRESS_LIST);

    return result ? result : [];
  }

  getDeliverablePostcode() {
    return this.http
      .get(`${environment.apiBaseUrl}/api/deliverable_post_codes`)
      .pipe(map((res: ApiResponseInterface) => res.data));
  }

}
