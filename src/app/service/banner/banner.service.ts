import { Injectable } from '@angular/core';
import axios from 'axios';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

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

  public arrayBanner() {
    console.log("rest")
    return this.arrayDataBanner
  }
}
