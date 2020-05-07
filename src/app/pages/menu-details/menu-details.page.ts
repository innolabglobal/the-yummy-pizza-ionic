import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { MenuService } from '../../services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { OnViewWillEnter } from '../../interfaces/ion-lifecycle.interface';
import { CurrencyService } from '../../services/currency.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.page.html',
  styleUrls: ['./menu-details.page.scss'],
})
export class MenuDetailsPage implements OnInit, OnViewWillEnter {

  id: any;
  count: any = 1;
  cart = {
    itemId: String,
    extraOptions: [],
    price: {
      name: '',
      value: 0,
      currency: ''
    },
    title: '',
    thumb: String,
    image: String,
    itemQuantity: this.count
  };
  selectedCurrency$: Observable<string>;
  savedCart = [];
  menuItem: any;

  constructor(public activatedRoute: ActivatedRoute,
              public alertCtrl: AlertController,
              public cartService: CartService,
              public currencyService: CurrencyService,
              public menuService: MenuService) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
  }

  ionViewWillEnter() {
    this.selectedCurrency$ = this.currencyService.selectedCurrency$;
    this.cartService.getCart();
    this.savedCart = this.cartService.cart;
  }

  ngOnInit(): void {
    this.menuService.getMenu(this.id).subscribe(res => {
      this.menuItem = res;
      this.cart.title = this.menuItem.name;
      this.cart.itemId = this.id;
      this.cart.image = this.menuItem.image;
    });
  }

  addQuantity() {
    if (this.count < 10) {
      this.count = this.count + 1;
      this.cart.itemQuantity = this.count;
    }
  }

  removeQuantity() {
    if (this.count > 1) {
      this.count = this.count - 1;
      this.cart.itemQuantity = this.count;
    }
  }

  sizeOptions(event) {
    const price = event.detail.value;
    this.cart.price = price;
    this.cart.price.value = Number(price.value);
  }

  async addToCart() {
    if (this.cart.price.name === '') {
      const alert = await this.alertCtrl.create({
        header: 'Alert!',
        subHeader: 'Please select size and price.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      this.cartService.saveCart(this.cart);
      this.cartService.getCart();
      this.savedCart = this.cartService.cart;
    }
  }


}
