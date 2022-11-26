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
        // console.log("response.data.data")
        // console.log(response.data.data)
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
        //   console.log('key', key)
        //   console.log(element)
        this.arrayDataSubCategory.push(dataSubCategory)
        // console.log(this.arrayDataSubCategory)
      }

      localStorage.setItem("test", JSON.stringify(this.arrayDataSubCategory))

      // console.log("LLENADO ARRAY")
      // console.log(this.arrayDataSubCategory)
    })
  }

  public arrayCategory() {
    return this.arrayDataCategory;
  }

}
