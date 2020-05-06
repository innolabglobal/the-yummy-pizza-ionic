import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OnViewWillEnter } from '../../interfaces/ion-lifecycle.interface';
import { ActivatedRoute } from '@angular/router';
import { OrderInterface } from '../../interfaces/order.interface';

@Component({
  selector: 'app-order-history-details',
  templateUrl: './order-history-details.page.html',
  styleUrls: ['./order-history-details.page.scss'],
})
export class OrderHistoryDetailsPage implements OnInit, OnViewWillEnter {

  order: OrderInterface;

  constructor(public activatedRoute: ActivatedRoute,
              public orderService: OrderService) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    const orderId = this.activatedRoute.snapshot.params.id;
    this.orderService.getOrder(orderId).subscribe(res => this.order = res);
  }
}
