import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  public arrayDataBanner = new Array();

  constructor() { }

  async getListMarcas() {
    await axios.get(`${environment.apiPath}/getMarcas`, environment.headerConfig).then(response => {

      for (let index = 0; index < response.data.data.length; index++) {
        const element = response.data.data[index];
        this.arrayDataBanner[index] = element
      }

    })
  }

  public arrayMarcas() {
    return this.arrayDataBanner
  }
}
