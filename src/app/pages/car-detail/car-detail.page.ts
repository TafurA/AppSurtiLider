import { Component, OnInit } from '@angular/core';
import { networkInterfaces } from 'os';
import { LoginService } from 'src/app/service/login/login.service';
import { OrderService } from 'src/app/service/order/order.service';
import { ShopingCarService } from 'src/app/service/shoping-car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.page.html',
})
export class CarDetailPage implements OnInit {

  public addressData = {
    userCurrent: "",
    address: "",
    phone: "",
    date: new Date()
  }

  public formatDate;

  public detailData = {
    cashback: "",
    productsLength: 0,
    subtotal: "",
    total: ""
  }
  public groupAddres = true;
  public groupPago = false;

  constructor(public loginService: LoginService, public shopingService: ShopingCarService, public orderService: OrderService) { }

  ngOnInit() {
    console.log(this.loginService.validateSession())
    this.addressData.userCurrent = this.loginService.validateSession()['nomcli_b'] + " " + this.loginService.validateSession()['ape1cli_b']
    this.addressData.address = this.loginService.validateSession()['dircli_b']
    this.addressData.phone = this.loginService.validateSession()['telcli_b']
    this.getOrderDeliveryDate()

    this.getOrderDetail()
  }

  public getOrderDeliveryDate() {
    this.addressData.date.setDate(this.addressData.date.getDate() + 1)
    const formatDate = this.addressData.date.toLocaleDateString(
      'es-es', { weekday: "long", month: "long", day: "numeric" })

    this.formatDate = formatDate

    return formatDate
  }

  public getOrderDetail() {
    const orderDetailTemp = JSON.parse(localStorage.getItem("orderDetail"))
    this.detailData.cashback = orderDetailTemp.cashback
    this.detailData.subtotal = orderDetailTemp.subtotal
    this.detailData.total = orderDetailTemp.total
    this.detailData.productsLength = orderDetailTemp.productsLength

    if (this.detailData.subtotal == "0") {
      this.detailData.subtotal = this.detailData.total
    }
  }

  public showPaymentStep() {
    this.groupAddres = false;
    this.groupPago = true

    const step = document.querySelector(".c-steps")
    const childrenStep = step.querySelector(".is-current")

    if (childrenStep) {
      childrenStep.classList.remove("is-current")
      childrenStep.classList.add("is-checked")

      childrenStep.nextElementSibling.classList.add("is-current")
    }
  }

  public sendOrder() {
    this.shopingService.sendOrder().finally(() => {
      console.log("PEDIDO REALIZADO")
      console.log(this.shopingService.idOrderCurrent)
      this.orderService.getOrderById(this.shopingService.idOrderCurrent).finally(() => {
        console.log("this.orderService.arrayCurrentOrderDetial[0]")
        console.log(this.orderService.arrayCurrentOrderDetial[0])
      })
    })
  }

  public

}
