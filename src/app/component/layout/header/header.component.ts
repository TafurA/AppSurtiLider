import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SearchService } from 'src/app/service/search/search.service';
import { ShopingCarService } from 'src/app/service/shoping-car.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  public numberProductsCar;
  public productsIsNull = true;

  constructor(
    public shopinCarService: ShopingCarService,
    public nvCtrl: NavController,
    public searchService: SearchService
  ) { }

  ngOnInit() {
    this.getCounterCarProducts()
    this.sendFormSearch()
  }

  public getCounterCarProducts() {
    const counterLocalStorage = localStorage.productsCar
    if (counterLocalStorage) {
      this.numberProductsCar = JSON.parse(counterLocalStorage).length
      this.productsIsNull = !this.productsIsNull
    } else {
      this.numberProductsCar = 0
      this.productsIsNull = this.productsIsNull
    }
  }

  public sendFormSearch() {
    const form = document.querySelector(".js-search-header");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(form.querySelector("input").value)
      this.searchService.getProductsOfSearch(
        form.querySelector("input").value
      ).then(() => {
        this.nvCtrl.navigateForward("search")
      })
    })
  }

}
