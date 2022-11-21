import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public arrayDataCategory = new Array();

  constructor() { }

  async getCategoryList() {
    await axios.get(`${environment.apiPath}/getCategory`, environment.headerConfig).then(response => {

      for (let index = 0; index < response.data.data.length; index++) {
        const element = response.data.data[index];
        this.arrayDataCategory[index] = element
      }

    })
  }

  public arrayCategory() {
    return this.arrayDataCategory
  }
}
