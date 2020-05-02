import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { OnViewWillEnter } from '../../models/ion-lifecycle';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnViewWillEnter {

  savedCart = [];
  menuList = [];

  constructor(private cartService: CartService,
              private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getAllMenu().subscribe(res => this.menuList = res);
  }

  ionViewWillEnter() {
    this.cartService.getCart();
    this.savedCart = this.cartService.cart;
  }
}
