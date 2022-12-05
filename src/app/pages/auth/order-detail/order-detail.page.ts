import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
})

export class OrderDetailPage implements OnInit {

  public order = {
    orderId: "",
    totalValue: 0,
    totalProducts: 0,
    customerName: "",
    address: "",
    phone: "",
    date: "",
    image: ""
  };

  public productsCurrentOrderDetail;

  constructor(public rutaActiva: ActivatedRoute, public orderService: OrderService) { }

  ngOnInit() {

    this.getOrderDetail().then(() => {
      this.orderService.getOrderById(this.order.orderId).finally(() => {
        this.order.orderId = this.orderService.arrayCurrentOrderDetial[0].orderId;
        this.order.totalValue = this.orderService.arrayCurrentOrderDetial[0].totalValue;
        this.order.customerName = this.orderService.arrayCurrentOrderDetial[0].name;
        this.order.address = this.orderService.arrayCurrentOrderDetial[0].address;
        this.order.phone = this.orderService.arrayCurrentOrderDetial[0].phone;
        this.order.date = this.orderService.arrayCurrentOrderDetial[0].date;
        this.order.image = this.orderService.arrayCurrentOrderDetial[0].img_prod;
      })
    })

  }

  public async getOrderDetail() {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.order.orderId = params.orderId;
        this.orderService.getOrderDetail(this.order.orderId).finally(() => {
          this.productsCurrentOrderDetail = JSON.parse(localStorage.productsCurrentOrderDetail)

          for (let index = 0; index < this.productsCurrentOrderDetail.length; index++) {
            const element = this.productsCurrentOrderDetail[index];

            this.order.totalProducts = element.length

            element.forEach(product => {
              product.cantidad = Math.round(product.cantidad)
            });
          }

        })
      }
    );
  }

  toggleDropdown(e) {
    e.target.closest(
      ".o-checkout__dropdown"
    ).classList.toggle("is-dropdown-show")
  }

  toggleDropdownProduct(e) {
    e.target.closest(
      ".c-status"
    ).classList.toggle("is-dropdown-show")
  }

}
