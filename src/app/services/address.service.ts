import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { AddressInterface } from '../interfaces/address.interface';
import { ApiResponseInterface } from '../interfaces/api-response.interface';
import { AuthService } from './auth.service';

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

    return result ? result : [];
  }

  getDeliverablePostcode() {
    return this.http
      .get(`${environment.apiBaseUrl}/api/deliverable_post_codes`)
      .pipe(map((res: ApiResponseInterface) => res.data));
  }

}
