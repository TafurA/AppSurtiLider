import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
})

export class OrderHistoryPage implements OnInit {

  public arrayDataOrders = new Array()

  constructor(public orderService: OrderService) { }

  ngOnInit() {
    this.getOrdersByClient()
  }

  getOrdersByClient() {
    this.orderService.getOrdersByClient().then(() => {
      this.arrayDataOrders = JSON.parse(localStorage.ordersUser)
      console.log("this.arrayDataOrders")
      console.log(this.arrayDataOrders)
    })
  }

}
