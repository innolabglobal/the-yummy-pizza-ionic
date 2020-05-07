import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-btn',
  templateUrl: './cart-btn.component.html',
  styleUrls: ['./cart-btn.component.scss'],
})
export class CartBtnComponent implements OnInit {

  savedCart = [];
  savedCart$: Observable<any[]>;

  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCart();
    this.savedCart = this.cartService.cart;
    this.savedCart$ = this.cartService.cart$;
  }

}
