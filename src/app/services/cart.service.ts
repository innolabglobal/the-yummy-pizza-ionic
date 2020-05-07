import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const KEY_CART = 'Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: any[] = [];
  cart$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  itemCart: any = {};
  itemInCart = [];

  constructor() {
    this.getCart();
  }

  addItemQuantity(data) {
    this.getCart();

    if (data.item.itemQuantity < 10) {
      data.item.itemQuantity = data.item.itemQuantity + 1;

      this.recalculateTotalPrice(data);

      localStorage.setItem(KEY_CART, JSON.stringify(this.cart));
    }
  }

  clearCart() {
    localStorage.removeItem(KEY_CART);
  }

  getCart() {
    this.cart = JSON.parse(localStorage.getItem(KEY_CART)) || [];
    this.cart$.next(this.cart);
  }

  recalculateTotalPrice(data) {
    this.cart.map(cartItem => {
      let totalPrice = 0;

      if (cartItem.item.itemId === data.item.itemId &&
        cartItem.item.price.pname === data.item.price.pname) {
        cartItem.item.itemQuantity = data.item.itemQuantity;
        totalPrice = cartItem.item.price.value;

        cartItem.itemTotalPrice = totalPrice * data.item.itemQuantity;

        return cartItem;
      }
    });
  }

  removeItem(data) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].item.itemId === data.item.itemId &&
        this.cart[i].item.price.pname === data.item.price.pname) {
        this.cart.splice(i, 1);

        if (this.cart.length === 0) {
          localStorage.removeItem(KEY_CART);
        } else {
          localStorage.setItem(KEY_CART, JSON.stringify(this.cart));
          this.cart = JSON.parse(localStorage.getItem(KEY_CART));
        }
      }
    }
  }

  removeItemQuantity(data) {
    this.getCart();

    if (data.item.itemQuantity > 1) {
      data.item.itemQuantity = data.item.itemQuantity - 1;

      this.recalculateTotalPrice(data);

      localStorage.setItem(KEY_CART, JSON.stringify(this.cart));
    }
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
          this.cart[i].item.price.name === item.price.name) {
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
