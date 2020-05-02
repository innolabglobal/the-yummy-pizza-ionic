import { Injectable } from '@angular/core';

const KEY_CART = 'Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: any[] = [];
  itemCart: any = {};
  itemInCart = [];

  constructor() {
    this.getCart();
  }

  getCart() {
    this.cart = JSON.parse(localStorage.getItem(KEY_CART));
  }

  saveCart(item: any) {
    this.getCart();

    this.itemInCart = [];
    let extotalPrice = 0;
    let totalPrice: number;
    let key = 'itemInCart';

    if (this.cart != null) {
      key = 'cart';

      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].item.itemId === item.itemId &&
          this.cart[i].item.price.priceName === item.price.priceName) {
          this.cart.splice(i, 1);
        }
      }
    }

    item.extraOptions.forEach((option, index) => extotalPrice = extotalPrice + Number(option.value));

    if (item.price.specialPrice) {
      totalPrice = extotalPrice + Number(item.price.specialPrice);
    } else {
      totalPrice = extotalPrice + Number(item.price.value);
    }

    this.itemCart.itemTotalPrice = totalPrice * item.itemQuantity;
    this.itemCart.item = item;
    this[key].push(this.itemCart);

    localStorage.setItem(KEY_CART, JSON.stringify(this[key]));
  }
}
