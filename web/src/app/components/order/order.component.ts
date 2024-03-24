import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() order!: Order;
  orderLink: string = '';

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  getOrderLink(): void {
    this.orderService.getOrderLink(this.order._id).subscribe(response => {
      this.orderLink = response.orderLink;
    });
  }

}
