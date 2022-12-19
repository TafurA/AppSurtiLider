import { Injectable } from '@angular/core';
import axios from 'axios';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  public arrayDataMarcas = new Array();
  public arrayDataSubProvider;
  public isProductsNull = false;

  constructor(private http: HTTP) { }

  async getListMarcas() {
    await this.http.get(`${environment.apiPath}/getProvider`, {}, environment.headerConfig).then(response => {

      for (let index = 0; index < response.data.data.length; index++) {
        const element = response.data.data[index];
        this.arrayDataMarcas[index] = element
      }

    })
  }

  async getProviderDetail(idProvider) {
    await axios.get(`${environment.apiPath}/getDetailProvider?provider=${idProvider}`, environment.headerConfig).then(response => {

      this.arrayDataSubProvider = []
      localStorage.removeItem("providersDetail")

      if (typeof (response.data.data.length) == "undefined") {

        for (const key in response.data.data) {

          const element = response.data.data[key];
          const dataDetailProvider = {
            nameCategory: key,
            product: element
          }
          this.arrayDataSubProvider.push(dataDetailProvider)
        }

        localStorage.setItem("providersDetail", JSON.stringify(this.arrayDataSubProvider))
        this.setIsProductsNull(false)
      } else {
        this.setIsProductsNull(true)
      }

    })
  }

  public getIsProductsNull() {
    return this.isProductsNull
  }

  public setIsProductsNull(isProductsNull) {
    this.isProductsNull = isProductsNull
  }

  public arrayMarcas() {
    return this.arrayDataMarcas
  }
}
