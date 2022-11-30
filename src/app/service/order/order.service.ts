import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public arrayDataOrders = []

  constructor(public loginService: LoginService) { }

  async getOrdersByClient() {
    await axios.get(`${environment.apiPath}getPedidosCliente?nitcli=${this.getClientCode()}`, environment.headerConfig).then(response => {
      console.log(response)
      this.arrayDataOrders = []
      localStorage.removeItem("ordersUser")

      for (const key in response.data.data) {

        const element = response.data.data[key];
        const dataSubCategory = {
          orderType: key,
          order: element
        }
        //   console.log('key', key)
        //   console.log(element)
        this.arrayDataOrders.push(dataSubCategory)
        // console.log(this.arrayDataSubCategory)
      }

      localStorage.setItem("ordersUser", JSON.stringify(this.arrayDataOrders))
      // this.arrayDataOrders[index] = response
    })
  }

  private getClientCode() {
    return this.loginService.validateSession()['codcli_b'];
  }
}
