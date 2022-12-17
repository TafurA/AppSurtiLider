import { Injectable } from '@angular/core';
import axios from 'axios';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  public arrayDataProducts = new Array();
  public arrayDetailBanner = new Array();
  public arrayDataBanner = new Array();

  constructor() { }

  async getBannerList() {
    await axios.get(`${environment.apiPath}/getBanner`, environment.headerConfig).then(response => {

      for (let index = 0; index < response.data.data.length; index++) {
        const element = response.data.data[index];
        this.arrayDataBanner[index] = element
      }
    })
  }

  async getBannerDetail(bannerId) {
    await axios.get(`${environment.apiPath}/getDetailBanner?codigo=${bannerId}`, environment.headerConfig).then(response => {

      this.arrayDetailBanner = response.data.dataBanner

      for (let index = 0; index < response.data.dataProduct.length; index++) {
        const element = response.data.dataProduct[index];
        this.arrayDataProducts[index] = element
      }

    })
  }

  public arrayBanner() {
    return this.arrayDataBanner
  }

  public arrayDataProductsBanner() {
    return this.arrayDataProducts
  }

  public arrayDetailProductBanner() {
    return this.arrayDetailBanner
  }
}
