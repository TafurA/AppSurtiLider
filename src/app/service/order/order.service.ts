import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public arrayDataOrders = []
  public arrayCurrentOrderDetial = []
  public arrayProductsCurrentOrderDetail = []

  constructor(public loginService: LoginService) { }

  async getOrdersByClient() {
    await axios.get(
      `${environment.apiPath}getPedidosCliente?nitcli=${this.getClientCode()}`,
      environment.headerConfig
    ).then(response => {
      this.arrayDataOrders = []
      localStorage.removeItem("ordersUser")

      for (const key in response.data.data) {
        const element = response.data.data[key];
        const dataSubCategory = {
          orderType: key,
          order: element
        }
        this.arrayDataOrders.push(dataSubCategory)
      }

      localStorage.setItem("ordersUser", JSON.stringify(this.arrayDataOrders))
    })
  }

  async getOrderDetail(orderId) {
    await axios.get(
      `${environment.apiPath}getPedidoDetalleCliente?idpedido=${orderId}`,
      environment.headerConfig
    ).then((response) => {

      this.arrayProductsCurrentOrderDetail = []
      localStorage.removeItem("productsCurrentOrderDetail")

      for (const key in response.data.ordersDetail) {
        const element = response.data.ordersDetail[key];
        this.arrayProductsCurrentOrderDetail.push(element)
      }

      localStorage.setItem(
        "productsCurrentOrderDetail",
        JSON.stringify(this.arrayProductsCurrentOrderDetail)
      )

    });
  }

  async getDataUserOrderDetail(orderId) {
    await axios.get(
      `${environment.apiPath}getDatosclientePed?idpedido=${orderId}`,
      environment.headerConfig
    ).then((response) => {

      const currentOrderDetail = {
        address: response.data.data.dircli_b,
        status: response.data.data.estped_b,
        date: response.data.data.fecha,
        name: response.data.data.nomcli_b,
        orderId: response.data.data.idpedido,
        phone: response.data.data.telcli_b,
        totalValue: response.data.data.valped_b,
        vendedorEncargado: response.data.data.venped_b,
      };

      this.arrayCurrentOrderDetial.push(currentOrderDetail);

    });
  }

  async getOrderById(orderId) {
    this.arrayCurrentOrderDetial = []
    const storageOrders = JSON.parse(localStorage.ordersUser)

    for (const key in storageOrders) {
      const order = storageOrders[key];

      order.order.forEach(orderDetail => {

        if (orderDetail.idpedido == orderId) {

          const currentOrderDetail = {
            address: orderDetail.dircli_b,
            status: orderDetail.estped_b,
            date: orderDetail.fecha,
            name: orderDetail.nomcli_b,
            orderId: orderDetail.idpedido,
            phone: orderDetail.telcli_b,
            totalValue: orderDetail.valped_b,
            vendedorEncargado: orderDetail.venped_b,
          }

          this.arrayCurrentOrderDetial.push(currentOrderDetail)

        }

      });

    }

    console.log("NUEVO ORDER DETAIL")
    console.log(this.arrayCurrentOrderDetial)
  }

  private getClientCode() {
    return this.loginService.validateSession()['codcli_b'];
  }
}
