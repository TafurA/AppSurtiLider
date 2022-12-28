import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { SearchService } from 'src/app/service/search/search.service';
import { ShopingCarService } from 'src/app/service/shoping-car.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  public numberProductsCar;
  public productsIsNull = true;

  public loader;

  constructor(
    public shopinCarService: ShopingCarService,
    public nvCtrl: NavController,
    public searchService: SearchService,
    public loadingController: LoadingController
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
    window.addEventListener("keypress", (e) => {

      if (e.keyCode === 13 && !e.shiftKey) {
        if (document.activeElement.tagName == "INPUT") {
          this.showLoader()

          this.searchService.getProductsOfSearch(
            form.querySelector("input").value
          ).then(() => {

            if (!window.location.pathname.includes("search")) {
              this.nvCtrl.navigateForward("search")
            }

            form.querySelector("input").value = ""
          }).finally(() => this.removeLoader())

        }
      }

    })

  }

  async showLoader() {
    this.loader = await this.loadingController.create({
      spinner: "bubbles",
      translucent: true,
      cssClass: 'o-loader'
    });
    await this.loader.present();
  }

  async removeLoader() {
    this.loader = await this.loadingController.dismiss();
  }

}
