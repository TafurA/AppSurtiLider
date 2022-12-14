import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public arrayDataCategory = new Array();
  public arrayDataSubCategory = new Array();

  constructor() {
  }

  async getCategoryList() {
    await axios.get(`${environment.apiPath}/getCategory`, environment.headerConfig).then(response => {

      for (let index = 0; index < response.data.data.length; index++) {
        const element = response.data.data[index];
        this.arrayDataCategory[index] = element
      }

    })
  }

  async getSubCategoryList(idCategory) {
    await axios.get(`${environment.apiPath}/getSubCategory?codecategory=${idCategory}`, environment.headerConfig).then(response => {

      this.arrayDataSubCategory = []
      localStorage.removeItem("test")

      for (const key in response.data.data) {

        const element = response.data.data[key];
        const dataSubCategory = {
          nameCategory: key,
          product: element
        }
        this.arrayDataSubCategory.push(dataSubCategory)
      }

      localStorage.setItem("test", JSON.stringify(this.arrayDataSubCategory))

    })
  }

  public arrayCategory() {
    return this.arrayDataCategory;
  }

}
