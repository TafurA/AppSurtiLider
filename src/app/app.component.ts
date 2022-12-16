import { Component } from '@angular/core';
import { ShopingCarService } from './service/shoping-car.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public shopingCarService: ShopingCarService) { }

  ngOnInit() {
    this.closeAlert()
  }

  public addQuantitifyProductToCar() {
    const productId = document.querySelector(".js-alert-product").getAttribute("id");

    this.shopingCarService.addProductQuantity(productId)
  }

  public removeQuantitifyProductToCar() {
    const productId = document.querySelector(".js-alert-product").getAttribute("id");
    this.shopingCarService.removeProductQuantity(productId)
  }

  public closeAlert() {
    this.shopingCarService.closeAlert()
  }
}
