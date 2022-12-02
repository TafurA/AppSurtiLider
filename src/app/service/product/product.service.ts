import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public arrayDataProducts = new Array();

  constructor() { }

  async getProducts() {
    await axios.get(`${environment.apiPath}/consultarProductos`, environment.headerConfig).then(response => {

      for (let index = 0; index < response.data.data.length; index++) {
        const element = response.data.data[index];
        this.arrayDataProducts[index] = element
      }

    })
  }

  async getRecomendedProducts(nit) {
    await axios.get(`${environment.apiPath}/getRecommended?nit=${nit}`, environment.headerConfig).then(response => {

      for (let index = 0; index < response.data.data.length; index++) {
        const element = response.data.data[index];
        this.arrayDataProducts[index] = element
      }

    })
  }

  async getOffertProducts() {
    await axios.get(`${environment.apiPath}/getProductOffers`, environment.headerConfig).then(response => {

      for (let index = 0; index < response.data.data.length; index++) {
        const element = response.data.data[index];
        this.arrayDataProducts[index] = element
      }

    })
  }

  async getCurrentProducts(nit) {
    // let session = true;
    let session = false;

    if (!session) {
      return await this.getProducts()
    } else {
      return await this.getRecomendedProducts("99313")
    }
  }

  public getArrayDataProducts() {
    return this.arrayDataProducts
  }

}
