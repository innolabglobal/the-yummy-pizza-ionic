import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menuList = [];

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getAllMenu().subscribe(res => this.menuList = res);
  }

}
