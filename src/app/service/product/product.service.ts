import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public arrayDataProducts = new Array();
  public arrayDetailProduct = new Array();

  public isproductsCharged = true

  constructor(public loginService: LoginService) { }

  async getProducts() {
    await axios.get(`${environment.apiPath}/consultarProductos`, environment.headerConfig).then(response => {

      for (let index = 0; index < response.data.data.length; index++) {
        const element = response.data.data[index];
        this.arrayDataProducts[index] = element
      }

    }).finally(() => {
      this.isproductsCharged = true
    })
  }

  async getProductDetail(productId) {
    await axios.get(`${environment.apiPath}/getProductoDetail?producto=${productId}`, environment.headerConfig).then(response => {
      this.arrayDetailProduct = response.data.dataObjProduct
    })
  }

  async getRecomendedProducts(nit) {
    this.arrayDataProducts = []
    await axios.get(`${environment.apiPath}/getRecommended?nit=${nit}`, environment.headerConfig).then(response => {

      for (let index = 0; index < response.data.data.length; index++) {
        const element = response.data.data[index];
        this.arrayDataProducts[index] = element
      }

    }).finally(() => {
      this.isproductsCharged = true
    })
  }

  async getOffertProducts() {
    this.arrayDataProducts = []
    await axios.get(`${environment.apiPath}/getProductOffers`, environment.headerConfig).then(response => {

      for (let index = 0; index < response.data.data.length; index++) {
        const element = response.data.data[index];
        this.arrayDataProducts[index] = element
      }

    }).finally(() => {
      this.isproductsCharged = true
    })
  }

  async getCurrentProducts() {
    let session = false;

    if (this.loginService.validateSession()['codcli_b']) {
      session = true
    }

    if (!session) {
      return await this.getProducts().finally(() => { this.isproductsCharged = true })
    } else {
      return await this.getRecomendedProducts(this.loginService.validateSession()['codcli_b']).finally(
        () => { this.isproductsCharged = true }
      )
    }
  }

  public getArrayDataProducts() {
    return this.arrayDataProducts
  }

}
