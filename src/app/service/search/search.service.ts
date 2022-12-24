import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  arrayDataProducts: any;
  arrayDataProductsLocalStorage: any;

  constructor() { }

  async getProductsOfSearch(searchWord) {
    await axios.get(
      `${environment.apiPath}/GetProductoSearch?searchword=${searchWord}`,
      environment.headerConfig)
      .then(response => {
        console.log(response)
        if (response.data.data) {
          this.arrayDataProducts = response.data.data
          this.setLocalStorageProductsSearch(this.arrayDataProducts)
        } else {
          console.log("NO HAY DE ESTE PRODUCTO")
          this.arrayDataProducts = []
          this.setLocalStorageProductsSearch(this.arrayDataProducts)
        }
      })
  }

  async setLocalStorageProductsSearch(array) {
    window.localStorage.setItem(
      "productsSearch",
      JSON.stringify(array)
    )
  }
}
